import { useEffect, useRef, type RefObject } from 'react';

interface Options {
  id: string | null; // what is on screen; null = nothing to track
  words: number; // length of the content, to decide how long a real read takes
  container: RefObject<HTMLElement>; // the scrolling reader
  enabled: boolean; // auto-tracking switched on
  listening: boolean; // audio is reading this item right now (counts as engaged)
  onRead: (id: string) => void;
}

const WORDS_PER_MINUTE = 200;
const MIN_SECONDS = 12;
const MAX_SECONDS = 90;
const IDLE_MS = 20_000; // no mouse/keyboard/scroll for this long = not reading
const SCROLL_DEPTH = 0.85;

/** Seconds of real attention a piece of content needs before it counts as read. */
export const secondsToRead = (words: number) => Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, ((words / WORDS_PER_MINUTE) * 60) * 0.4));

/**
 * Decides when the item on screen has really been read, so that merely clicking through a list tracks nothing.
 * It must be (1) on screen for a fair time, counted only while the tab is visible and the user is active or
 * listening, and (2) scrolled to near the end (or short enough to fit on screen).
 */
export function useReadTracker(opts: Options) {
  const o = useRef(opts);
  o.current = opts;

  useEffect(() => {
    const { id } = o.current;
    if (!id) return;
    let active = 0; // seconds of attention
    let depth = 0; // deepest scroll position, 0..1
    let lastActivity = Date.now();
    let done = false;

    const bump = () => { lastActivity = Date.now(); };
    const measure = () => {
      const el = o.current.container.current;
      if (!el) return;
      const d = el.scrollHeight <= el.clientHeight + 40 ? 1 : (el.scrollTop + el.clientHeight) / el.scrollHeight;
      depth = Math.max(depth, d);
    };

    const events = ['mousemove', 'keydown', 'pointerdown', 'touchstart', 'wheel'] as const;
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const el = o.current.container.current;
    const onScroll = () => { bump(); measure(); };
    el?.addEventListener('scroll', onScroll, { passive: true });

    const timer = window.setInterval(() => {
      if (done) return;
      const cur = o.current;
      if (!cur.enabled) return;
      measure();
      const attentive = document.visibilityState === 'visible' && (cur.listening || (document.hasFocus() && Date.now() - lastActivity < IDLE_MS));
      if (attentive) active += 1;
      if (active >= secondsToRead(cur.words) && depth >= SCROLL_DEPTH) {
        done = true;
        cur.onRead(id);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
      events.forEach((e) => window.removeEventListener(e, bump));
      el?.removeEventListener('scroll', onScroll);
    };
  }, [opts.id]); // eslint-disable-line react-hooks/exhaustive-deps
}
