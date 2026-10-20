import { pickDefaultVoice, speechSupported } from './speech';

export interface SpeakOptions {
  engine: 'piper' | 'browser';
  rate: number; // 1 = normal
  browserVoice: string; // browser voice name, '' = automatic
  piperVoice: string; // Piper voice id
}

const PREFETCH_LIMIT = 24;

/**
 * Speaks one chunk of text at a time, with Piper (local neural voice, via the Node server) or the
 * browser's speech synthesis. If Piper fails it falls back to the browser for that chunk, and after
 * repeated failures stops trying Piper for the rest of the session.
 */
export class Speaker {
  private token = 0; // bumped on every speak/cancel so stale callbacks are ignored
  private audio: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;
  private utterance: SpeechSynthesisUtterance | null = null; // keep a reference: Chrome may GC it mid-speech
  private cache = new Map<string, Promise<Blob>>();
  private failures = 0;

  get piperBroken() {
    return this.failures >= 2;
  }

  speak(text: string, o: SpeakOptions, onend: () => void) {
    this.stop();
    const my = ++this.token;
    const fallback = () => {
      if (my === this.token) this.speakInBrowser(text, o, my, onend);
    };
    if (o.engine !== 'piper' || this.piperBroken) return this.speakInBrowser(text, o, my, onend);

    this.blob(text, o)
      .then((blob) => {
        if (my !== this.token) return;
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        this.audio = audio;
        this.objectUrl = url;
        audio.onended = () => {
          this.release();
          if (my === this.token) onend();
        };
        audio.onerror = () => {
          this.release();
          this.failures += 1;
          fallback();
        };
        audio.play().catch(() => {
          this.release();
          fallback();
        });
      })
      .catch(() => {
        this.failures += 1;
        fallback();
      });
  }

  /** Fetch audio for upcoming text in the background so playback has no gaps. */
  prefetch(text: string, o: SpeakOptions) {
    if (o.engine === 'piper' && !this.piperBroken) this.blob(text, o).catch(() => {});
  }

  cancel() {
    this.token += 1;
    this.stop();
  }

  private stop() {
    if (this.utterance) this.utterance.onend = null; // a cancelled utterance must not advance playback
    this.utterance = null;
    this.audio?.pause();
    this.release();
    if (speechSupported) window.speechSynthesis.cancel();
  }

  private release() {
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = null;
    this.audio = null;
  }

  private blob(text: string, o: SpeakOptions): Promise<Blob> {
    const key = `${o.piperVoice}|${o.rate}|${text}`;
    const hit = this.cache.get(key);
    if (hit) return hit;
    const p = fetch('/api/tts/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: o.piperVoice || undefined, length_scale: Math.min(1.6, Math.max(0.5, 1 / o.rate)) }),
    }).then((res) => {
      if (!res.ok) throw new Error(`Piper ${res.status}`);
      return res.blob();
    });
    this.cache.set(key, p);
    p.catch(() => this.cache.delete(key));
    if (this.cache.size > PREFETCH_LIMIT) this.cache.delete(this.cache.keys().next().value as string);
    return p;
  }

  private speakInBrowser(text: string, o: SpeakOptions, my: number, onend: () => void) {
    if (!speechSupported) return onend();
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === o.browserVoice) ?? pickDefaultVoice(voices);
    const u = new SpeechSynthesisUtterance(text);
    u.rate = o.rate;
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    }
    u.onend = () => my === this.token && onend();
    u.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return; // we caused it
      if (my === this.token) onend();
    };
    this.utterance = u;
    window.speechSynthesis.speak(u);
  }
}
