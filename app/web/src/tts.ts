// Turns the Markdown of an answer into speakable chunks, grouped by top-level block.
//
// The renderer (Markdown.tsx) tags every top-level block with the same index computed here,
// so "play from this paragraph" and "highlight what is being read" line up exactly.
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const MAX_CHUNK = 200; // browsers cut off long utterances, and short chunks make pause/resume precise

const parser = unified().use(remarkParse).use(remarkGfm);

/** Minimal shape of an mdast node; avoids depending on the full type union. */
interface N {
  type: string;
  value?: string;
  alt?: string | null;
  lang?: string | null;
  children?: N[];
  position?: { start: { offset?: number } };
}

/** How the answer is narrated. */
export type Style = 'full' | 'explain' | 'brief';

interface Ctx {
  announce: boolean;
  style: Style;
  index: number; // block index; used to vary phrases deterministically
}

export interface Block {
  /** character offset of the block in the source, used to match rendered elements */
  offset: number;
  /** speakable chunks; empty for blocks that are silent (e.g. a rule) */
  chunks: string[];
}

// How text-to-speech engines should say technical terms (they often get these wrong).
const PRONOUNCE: [RegExp, string | ((match: string, n: string) => string)][] = [
  [/\bgoroutines\b/gi, 'go routines'],
  [/\bgoroutine\b/gi, 'go routine'],
  [/\bgRPC\b/g, 'g R P C'],
  [/\bkubectl\b/gi, 'kube control'],
  [/\betcd\b/gi, 'et see dee'],
  [/\bOOM-?Killed\b/g, 'O O M killed'],
  [/\bSIGTERM\b/g, 'sig term'],
  [/\bSIGKILL\b/g, 'sig kill'],
  [/\bSIGINT\b/g, 'sig int'],
  [/\bHPA\b/g, 'H P A'],
  [/\bCRDs?\b/g, 'C R D'],
  [/\bCI\/CD\b/g, 'C I C D'],
  [/\bI\/O\b/g, 'I O'],
  [/\bp(50|90|95|99)\b/gi, (_m, n) => `p ${n}`],
  [/\bGOMAXPROCS\b/g, 'go max procs'],
  [/\bGOMEMLIMIT\b/g, 'go mem limit'],
  [/\bGOGC\b/g, 'go G C'],
  [/\bK8s\b/gi, 'Kubernetes'],
  [/\bns\/op\b/g, 'nanoseconds per op'],
];

const CONTRACTIONS: [RegExp, string][] = [
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bis not\b/gi, "isn't"],
  [/\bare not\b/gi, "aren't"],
  [/\bcannot\b/gi, "can't"],
  [/\bwill not\b/gi, "won't"],
  [/\bshould not\b/gi, "shouldn't"],
  [/\bit is\b/gi, "it's"],
  [/\bthat is\b/gi, "that's"],
  [/\byou will\b/gi, "you'll"],
  [/\bthey are\b/gi, "they're"],
];

function cleanForSpeech(s: string, style: Style = 'full'): string {
  let out = s
    .replace(/❌/g, 'Bad: ')
    .replace(/✅/g, 'Good: ')
    .replace(/⚠️?/g, 'Warning: ')
    .replace(/\be\.g\.,?/gi, 'for example,')
    .replace(/\bi\.e\.,?/gi, 'that is,')
    .replace(/\bvs\.?(?=\s)/gi, 'versus')
    .replace(/\s*(->|=>|→)\s*/g, ' to ')
    .replace(/<-/g, ' from ')
    .replace(/&/g, ' and ')
    .replace(/[~^|]/g, ' ');
  for (const [re, to] of PRONOUNCE) out = out.replace(re, to as string); // replace() accepts a function too
  if (style === 'explain') {
    for (const [re, to] of CONTRACTIONS) out = out.replace(re, (m) => (m[0] === m[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to));
  }
  return out.replace(/\s+/g, ' ').trim();
}

/** Drop "(…)" asides when a natural sentence remains; they read badly aloud. */
function dropAsides(s: string): string {
  const t = s.replace(/\s*\([^)]*\)/g, '').replace(/\s+([,.;:])/g, '$1');
  return t.split(/\s+/).length >= 5 ? t : s;
}

/** Split a block of text into sentence-sized chunks of at most MAX_CHUNK characters. */
function splitText(text: string): string[] {
  const sentences = text.split(/(?<=[.!?;:])\s+/);
  const out: string[] = [];
  let cur = '';
  const flush = () => {
    if (cur) out.push(cur);
    cur = '';
  };
  for (const s of sentences) {
    if (s.length > MAX_CHUNK) {
      flush();
      let rest = s;
      while (rest.length > MAX_CHUNK) {
        let cut = rest.lastIndexOf(', ', MAX_CHUNK);
        if (cut < 40) cut = rest.lastIndexOf(' ', MAX_CHUNK);
        if (cut < 1) cut = MAX_CHUNK;
        out.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(cut + 1).trim();
      }
      cur = rest;
    } else if ((cur + ' ' + s).trim().length > MAX_CHUNK) {
      flush();
      cur = s;
    } else {
      cur = (cur + ' ' + s).trim();
    }
  }
  flush();
  return out;
}

/** Plain text of inline content (markdown syntax already stripped by the parser). */
function inline(n: N): string {
  switch (n.type) {
    case 'text':
    case 'inlineCode':
      return n.value ?? '';
    case 'break':
      return ' ';
    case 'image':
      return n.alt ?? '';
    case 'html':
    case 'code':
      return '';
    default:
      return (n.children ?? []).map(inline).join('');
  }
}

// Spoken forms of the bold lead-in labels used in the answers ("**Short answer:** …").
const LABELS: [RegExp, string][] = [
  [/^short answer$/, 'In short,'],
  [/^interview tip/, "Here's a tip for the interview."],
  [/^(pro )?tip$/, 'A quick tip.'],
  [/^(gotchas?|watch out|warning|careful)/, 'Watch out for this.'],
  [/^(common )?mistakes/, 'Here are some common mistakes.'],
  [/^rules?( of thumb)?$/, 'Some rules of thumb.'],
  [/^examples?$/, "Here's an example."],
  [/^remember$/, 'Keep this in mind.'],
  [/^why/, 'Here is why.'],
];

/** For "**Label:** rest" paragraphs, the lower-cased label and the remaining text. */
function leadLabel(n: N): { label: string; raw: string; rest: string } | null {
  const first = n.children?.[0];
  if (n.type !== 'paragraph' || first?.type !== 'strong') return null;
  const label = inline(first).trim();
  if (!label.endsWith(':')) return null;
  return { label: label.slice(0, -1).toLowerCase(), raw: label.slice(0, -1), rest: (n.children ?? []).slice(1).map(inline).join('').trim() };
}

const CODE_PHRASES = ["Have a look at the example on screen.", 'The code on screen shows how this works.', "There's a short example on screen."];
const DIAGRAM_PHRASES = ['The diagram on screen shows this visually.', 'Take a look at the diagram on screen.'];
const MAX_ITEMS = 5;
const MAX_ROWS = 3;

/** Sentences for one block-level node. Each entry is spoken as its own sentence. */
function sentences(n: N, c: Ctx): string[] {
  const explain = c.style !== 'full';
  const tidy = (s: string) => (explain ? dropAsides(s) : s);

  switch (n.type) {
    case 'heading':
      return [explain ? `Now, ${inline(n)}.` : inline(n)];

    case 'paragraph': {
      const lead = explain ? leadLabel(n) : null;
      if (lead) {
        const phrase = LABELS.find(([re]) => re.test(lead.label))?.[1];
        const rest = tidy(lead.rest);
        return phrase ? [rest ? `${phrase} ${rest}` : phrase] : [`${lead.raw}: ${rest}`];
      }
      return [tidy(inline(n))];
    }

    case 'listItem':
      // explain mode reads the item's own text and leaves nested lists to the screen
      return (n.children ?? []).filter((x) => !explain || x.type !== 'list').flatMap((x) => sentences(x, c));

    case 'list': {
      const items = n.children ?? [];
      const shown = explain ? items.slice(0, MAX_ITEMS) : items;
      const out = shown.flatMap((it) => sentences(it, c));
      if (explain && items.length > shown.length) out.push('And a few more points are on screen.');
      return out;
    }

    case 'blockquote':
      return (n.children ?? []).flatMap((x) => sentences(x, c));

    case 'table': {
      const rows = (n.children ?? []).map((row) => (row.children ?? []).map(inline).filter(Boolean));
      if (!explain) return rows.map((r) => r.join(', '));
      const body = rows.slice(1);
      const out = ["Here's a quick comparison."];
      for (const r of body.slice(0, MAX_ROWS)) out.push(tidy(r.length === 2 ? `${r[0]}: ${r[1]}` : r.join(', ')));
      if (body.length > MAX_ROWS) out.push('There are more rows on screen.');
      return out;
    }

    case 'code': {
      if (!c.announce) return [];
      const mermaid = n.lang === 'mermaid';
      if (!explain) return [mermaid ? 'There is a diagram on screen.' : 'There is a code example on screen.'];
      const list = mermaid ? DIAGRAM_PHRASES : CODE_PHRASES;
      return [list[c.index % list.length]];
    }

    default:
      return [];
  }
}

function toChunks(parts: string[], style: Style): string[] {
  return parts.flatMap((raw) => {
    const text = cleanForSpeech(raw, style);
    if (!/[\p{L}\p{N}]/u.test(text)) return [];
    return splitText(/[.!?:;]$/.test(text) ? text : text + '.');
  });
}

const cache = new Map<string, Block[]>();

/** Top-level blocks of a Markdown document, in order. Index in this array = block index everywhere. */
export function parseBlocks(markdown: string, announce: boolean, style: Style = 'full'): Block[] {
  const key = `${style}:${announce ? 1 : 0}:${markdown}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const root = parser.parse(markdown) as unknown as N;
  const nodes = root.children ?? [];
  const firstParagraph = nodes.findIndex((n) => n.type === 'paragraph');

  const blocks = nodes.map((n, index) => {
    // brief: only the opening paragraph (the short answer) and the interview tip
    if (style === 'brief') {
      const tip = leadLabel(n)?.label.startsWith('interview tip') ?? false;
      if (index !== firstParagraph && !tip) return { offset: n.position?.start.offset ?? -1, chunks: [] };
    }
    return {
      offset: n.position?.start.offset ?? -1,
      chunks: toChunks(sentences(n, { announce: announce && style !== 'brief', style, index }), style),
    };
  });

  if (cache.size > 300) cache.clear();
  cache.set(key, blocks);
  return blocks;
}

/** Map from a block's source offset to its index; used by the renderer to tag elements. */
export function blockIndexByOffset(markdown: string): Map<number, number> {
  return new Map(parseBlocks(markdown, true, "full").map((b, i) => [b.offset, i]));
}

export interface Step {
  kind: 'speak' | 'wait';
  text: string; // spoken text, or the label for a wait
  ms?: number;
  part?: 'question' | 'answer';
  block?: number; // index of the answer block this step reads
}

export interface PlayerSettings {
  rate: number;
  voice: string;
  quiz: boolean; // question, thinking pause, then answer
  thinkSeconds: number;
  gapSeconds: number;
  autoNext: boolean;
  announceCode: boolean;
  follow: boolean; // scroll the block being read into view
  style: Style;
}

const QUESTION_INTROS = ['Question {n}.', 'Next up, question {n}.', 'Alright, question {n}.', "Let's look at question {n}."];
const ANSWER_INTROS = ["Here's the answer.", 'Let me explain.', "Here's how I'd answer that.", 'So, here is the idea.'];

export function buildSteps(number: number, question: string, answer: string, s: PlayerSettings): Step[] {
  const explain = s.style !== 'full';
  const title = cleanForSpeech(question.replace(/`/g, ''), s.style);
  const intro = explain ? QUESTION_INTROS[number % QUESTION_INTROS.length].replace('{n}', String(number)) : `Question ${number}.`;
  const steps: Step[] = [{ kind: 'speak', part: 'question', text: `${intro} ${title}` }];

  if (s.quiz && s.thinkSeconds > 0) steps.push({ kind: 'wait', text: 'Think about your answer', ms: s.thinkSeconds * 1000 });
  else steps.push({ kind: 'wait', text: '', ms: explain ? 900 : 700 });

  steps.push({ kind: 'speak', part: 'answer', text: explain ? ANSWER_INTROS[number % ANSWER_INTROS.length] : 'Answer.' });
  parseBlocks(answer, s.announceCode, s.style).forEach((b, i) => {
    for (const chunk of b.chunks) steps.push({ kind: 'speak', part: 'answer', text: chunk, block: i });
  });
  if (s.gapSeconds > 0) steps.push({ kind: 'wait', text: 'Next question coming up', ms: s.gapSeconds * 1000 });
  return steps;
}
