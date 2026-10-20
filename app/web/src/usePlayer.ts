import { useEffect, useRef, useState } from 'react';
import type { Speaker, SpeakOptions } from './speaker';
import type { PlayerSettings, Step } from './tts';

export type Status = 'idle' | 'playing' | 'paused';

interface Options {
  count: number;
  steps: (index: number) => Step[];
  onIndex: (index: number) => void;
  settings: () => PlayerSettings;
  speaker: Speaker;
  speakOptions: () => SpeakOptions;
  /** A question was read aloud from its start to its end (not skipped, not started mid-way). */
  onDone?: (index: number) => void;
}

/**
 * Plays questions one after another with the browser's speech synthesis.
 *
 * Pause is implemented as "cancel and remember where we were" instead of speechSynthesis.pause(),
 * which is unreliable across browsers. Resuming replays the current sentence from its start.
 */
export function usePlayer(opts: Options) {
  const o = useRef(opts);
  o.current = opts;

  const token = useRef(0); // bumped on every stop/pause/jump so stale callbacks are ignored
  const pos = useRef({ q: 0, s: 0 });
  const timers = useRef<{ wait?: number; tick?: number }>({});
  const began = useRef(-1); // question that was started from its first sentence

  const [status, setStatus] = useState<Status>('idle');
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState<{ text: string; part?: 'question' | 'answer'; block?: number } | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const clearTimers = () => {
    window.clearTimeout(timers.current.wait);
    window.clearInterval(timers.current.tick);
    timers.current = {};
    setCountdown(null);
  };

  const halt = () => {
    token.current += 1;
    clearTimers();
    o.current.speaker.cancel();
  };

  const finish = () => {
    halt();
    setStatus('idle');
    setNow(null);
  };

  const run = (q: number, s: number, my: number) => {
    if (my !== token.current) return;
    const cur = o.current;
    if (q >= cur.count) return finish();

    pos.current = { q, s };
    if (s === 0) {
      began.current = q;
      setIndex(q);
      cur.onIndex(q);
    }

    const steps = cur.steps(q);
    if (s >= steps.length) {
      if (began.current === q) cur.onDone?.(q);
      if (cur.settings().autoNext) return run(q + 1, 0, my);
      return finish();
    }

    const step = steps[s];
    const next = () => run(q, s + 1, my);

    if (step.kind === 'wait') {
      const ms = step.ms ?? 0;
      if (step.text) setNow({ text: step.text });
      const end = Date.now() + ms;
      if (ms >= 2000) {
        setCountdown(Math.ceil(ms / 1000));
        timers.current.tick = window.setInterval(() => setCountdown(Math.max(0, Math.ceil((end - Date.now()) / 1000))), 250);
      }
      timers.current.wait = window.setTimeout(() => {
        clearTimers();
        next();
      }, ms);
      return;
    }

    const opts = cur.speakOptions();
    setNow({ text: step.text, part: step.part, block: step.block });
    cur.speaker.speak(step.text, opts, next);
    // fetch the next sentences now so Piper playback has no gaps
    for (const ahead of steps.slice(s + 1, s + 3)) if (ahead.kind === 'speak') cur.speaker.prefetch(ahead.text, opts);
  };

  const start = (q: number, s: number) => {
    halt();
    setStatus('playing');
    const my = token.current;
    // a tiny delay lets cancel() settle before speak(); avoids dropped utterances in Chrome
    window.setTimeout(() => run(q, s, my), 40);
  };

  /** Start at question q (or resume if paused). With `block`, start at that block of q's answer. */
  const play = (q?: number, block?: number) => {
    if (status === 'paused' && q === undefined) return resume();
    const qi = q ?? pos.current.q;
    if (block === undefined) return start(qi, 0);
    began.current = -1; // starting mid-answer: do not count it as fully listened
    const steps = o.current.steps(qi);
    let si = steps.findIndex((st) => st.kind === 'speak' && st.block !== undefined && st.block >= block);
    if (si < 0) si = steps.length; // nothing left to read here: move on to the next question
    setIndex(qi);
    o.current.onIndex(qi);
    start(qi, si);
  };
  const pause = () => {
    if (status !== 'playing') return;
    halt();
    setStatus('paused');
  };
  const resume = () => {
    if (status !== 'paused') return;
    start(pos.current.q, pos.current.s);
  };
  const stop = () => finish();

  useEffect(() => () => halt(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return { status, index, now, countdown, play, pause, resume, stop };
}
