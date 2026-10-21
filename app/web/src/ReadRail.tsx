import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/** Phones keep the normal scroll indicator; the dot rail is for larger screens. */
function usePhone() {
  const query = '(max-width: 700px)';
  const [phone, setPhone] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}

interface Section {
  el: HTMLElement;
  label: string;
  words: number;
}

interface Props {
  container: RefObject<HTMLElement>; // the scrolling reader
  contentKey: string; // changes when a different question / problem part is shown
}

const MAX_DOTS = 12;
const WORDS_PER_MINUTE = 200;

const clean = (s: string) => s.replace(/\s+/g, ' ').replace(/[:：]\s*$/, '').trim();
const words = (el: Element) => (el.textContent ?? '').split(/\s+/).filter(Boolean).length;

/** Name a top-level block of an answer: a heading, a bold lead-in ("Short answer:"), or its kind (code, diagram, table). */
function labelOf(el: HTMLElement): string | null {
  if (/^H[2-6]$/.test(el.tagName)) return clean(el.textContent ?? '');
  if (el.classList.contains('codeblock')) return 'Code';
  if (el.classList.contains('diagram')) return 'Diagram';
  if (el.classList.contains('table-wrap')) return 'Comparison';
  const lead = el.firstElementChild;
  if (el.tagName === 'P' && lead?.tagName === 'STRONG') {
    // only real lead-ins such as "Short answer:" or "Gotcha:", not a bolded word at the start of a sentence
    const raw = (lead.textContent ?? '').trim();
    const t = clean(raw);
    if (/[:：]$/.test(raw) && t.length > 1 && t.length <= 40) return t;
  }
  return null;
}

/** Collect the sections of the rendered answer, in order, with the first dot at the very top. */
function collect(container: HTMLElement): Section[] {
  const blocks = [...container.querySelectorAll<HTMLElement>('.prose > [data-block]')];
  const out: Section[] = [];
  const first = container.querySelector<HTMLElement>('article h1');
  if (first) out.push({ el: first, label: 'Start', words: 0 });
  let last = '';
  for (const b of blocks) {
    const label = labelOf(b);
    if (label && label !== last) {
      out.push({ el: b, label, words: 0 });
      last = label;
    }
  }
  // fill in how many words each section holds (until the next section), for the "time left" estimate
  const all = blocks.map((b) => ({ b, w: words(b) }));
  out.forEach((s, i) => {
    const from = all.findIndex((x) => x.b === s.el);
    const next = out[i + 1] ? all.findIndex((x) => x.b === out[i + 1].el) : all.length;
    s.words = from < 0 ? 0 : all.slice(from, next < 0 ? all.length : next).reduce((n, x) => n + x.w, 0);
  });
  if (out.length < 3 && blocks.length >= 4) {
    // no structure to name: use a few evenly spaced paragraphs, labelled by their first words
    const fallback: Section[] = first ? [{ el: first, label: 'Start', words: 0 }] : [];
    const step = Math.ceil(blocks.length / 5);
    for (let i = step; i < blocks.length; i += step) fallback.push({ el: blocks[i], label: clean((blocks[i].textContent ?? '').split(/\s+/).slice(0, 5).join(' ')) + '…', words: 0 });
    return fallback;
  }
  if (out.length > MAX_DOTS) {
    const keep = new Set<number>([0, out.length - 1]);
    const stride = (out.length - 1) / (MAX_DOTS - 1);
    for (let i = 0; i < MAX_DOTS; i += 1) keep.add(Math.round(i * stride));
    return out.filter((_, i) => keep.has(i));
  }
  return out;
}

/**
 * A slim rail of dots instead of a scrollbar: one dot per section of the answer. Filled dots are behind you,
 * the ringed one is where you are, hollow ones are still ahead. Click a dot to jump there.
 */
export default function ReadRail({ container, contentKey }: Props) {
  const phone = usePhone();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 of the scrollable distance
  const [scrollable, setScrollable] = useState(false);
  const raf = useRef(0);
  const pinned = useRef({ index: -1, until: 0 }); // the dot just clicked stays current while the page scrolls there

  const refresh = useCallback(() => {
    const root = container.current;
    if (!root) return;
    setSections(collect(root));
  }, [container]);

  // find the sections after the answer has rendered, and again when its height changes (diagrams, fonts)
  useEffect(() => {
    const root = container.current;
    if (!root || phone) return;
    const t = window.setTimeout(refresh, 60);
    const ro = new ResizeObserver(() => { window.clearTimeout(raf.current); raf.current = window.setTimeout(refresh, 120); });
    const article = root.querySelector('article');
    if (article) ro.observe(article);
    return () => { window.clearTimeout(t); window.clearTimeout(raf.current); ro.disconnect(); };
  }, [contentKey, container, refresh, phone]);

  const measure = useCallback(() => {
    const root = container.current;
    if (!root) return;
    const max = root.scrollHeight - root.clientHeight;
    setScrollable(max > 80);
    setProgress(max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0);
    const top = root.getBoundingClientRect().top;
    let idx = 0;
    sections.forEach((s, i) => { if (s.el.getBoundingClientRect().top - top <= root.clientHeight * 0.3) idx = i; });
    if (root.scrollTop >= max - 4) idx = sections.length - 1; // at the very end the last dot is current
    if (Date.now() < pinned.current.until) idx = pinned.current.index;
    setActive(idx);
  }, [container, sections]);

  useEffect(() => {
    const root = container.current;
    if (!root || phone) return;
    let frame = 0;
    const on = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    measure();
    root.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(frame); root.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [container, measure, phone]);

  if (phone || !scrollable || sections.length < 2) return null;

  const totalWords = sections.reduce((n, s) => n + s.words, 0) || 1;
  const minutesLeft = Math.max(0, Math.ceil((totalWords * (1 - progress)) / WORDS_PER_MINUTE));
  const jump = (s: Section, index: number) => {
    const root = container.current;
    if (!root) return;
    pinned.current = { index, until: Date.now() + 900 };
    window.setTimeout(measure, 950);
    const y = s.el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 24;
    root.scrollTo({ top: Math.max(0, y), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div className="rail-wrap">
      <nav className="rail" aria-label="Sections of this answer">
        <div className="rail-line" aria-hidden="true"><i style={{ height: `${progress * 100}%` }} /></div>
        {sections.map((s, i) => (
          <button
            key={`${i}-${s.label}`}
            className={'rail-dot' + (i < active ? ' past' : i === active ? ' current' : '')}
            onClick={() => jump(s, i)}
            aria-label={s.label}
            aria-current={i === active ? 'true' : undefined}
            title={s.label}
          >
            <span className="rail-label">{s.label}</span>
          </button>
        ))}
        <div className="rail-left" aria-live="off">{progress >= 0.98 ? 'Done' : minutesLeft <= 1 ? '< 1 min' : `${minutesLeft} min`}</div>
      </nav>
    </div>
  );
}
