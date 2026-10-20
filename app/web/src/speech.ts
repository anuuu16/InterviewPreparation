import { useEffect, useState } from 'react';

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

/** "en-IN" / "en_IN" -> "en" */
export const familyOf = (lang: string) => lang.toLowerCase().replace('_', '-').split('-')[0];

/** Human-readable language name in the user's own language, e.g. "Indian English". */
export function languageName(lang: string): string {
  try {
    return new Intl.DisplayNames([navigator.language || 'en'], { type: 'language' }).of(lang.replace('_', '-')) ?? lang;
  } catch {
    return lang;
  }
}

const SAMPLES: Record<string, string> = {
  en: 'Hello! This is how I will read your interview questions and answers.',
  hi: 'नमस्ते! मैं इस तरह आपके इंटरव्यू के प्रश्न और उत्तर पढ़ूँगा।',
  es: '¡Hola! Así leeré tus preguntas y respuestas de entrevista.',
  fr: 'Bonjour ! Voici comment je lirai vos questions et réponses d’entretien.',
  de: 'Hallo! So lese ich Ihre Interviewfragen und Antworten vor.',
  it: 'Ciao! Ecco come leggerò le tue domande e risposte del colloquio.',
  pt: 'Olá! É assim que vou ler as suas perguntas e respostas de entrevista.',
  ja: 'こんにちは。面接の質問と答えをこのように読み上げます。',
  zh: '你好！我会这样朗读你的面试问题和答案。',
  ko: '안녕하세요! 면접 질문과 답변을 이렇게 읽어 드릴게요.',
  ru: 'Здравствуйте! Вот так я буду читать ваши вопросы и ответы к собеседованию.',
  ar: 'مرحبًا! هكذا سأقرأ أسئلة المقابلة وإجاباتها.',
  nl: 'Hallo! Zo lees ik je sollicitatievragen en antwoorden voor.',
  tr: 'Merhaba! Mülakat sorularınızı ve cevaplarınızı böyle okuyacağım.',
};

/** A short sample sentence in the voice's language (falls back to English). */
export const sampleText = (lang: string) => SAMPLES[familyOf(lang)] ?? SAMPLES.en;

const QUALITY = /natural|neural|premium|enhanced|google/i;

// macOS ships joke/effect voices that are useless for reading; list them last and label them.
const NOVELTY = /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Pipe Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox)\b/;
export const isNovelty = (v: SpeechSynthesisVoice) => NOVELTY.test(v.name);

/** Sort order for listing voices: good ones first, novelty last, then by name. */
export function compareVoices(a: SpeechSynthesisVoice, b: SpeechSynthesisVoice): number {
  const rank = (v: SpeechSynthesisVoice) => (isNovelty(v) ? 2 : QUALITY.test(v.name) ? 0 : 1);
  return rank(a) - rank(b) || a.name.localeCompare(b.name);
}

/**
 * Best English voice for reading the (English) questions when the user has not chosen one:
 * the browser's own language first, then Indian/British/US English, preferring higher-quality voices.
 */
export function pickDefaultVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const english = voices.filter((v) => familyOf(v.lang) === 'en' && !isNovelty(v));
  if (!english.length) return undefined;
  const prefs = [navigator.language, 'en-IN', 'en-GB', 'en-US'].map((l) => l.toLowerCase().replace('_', '-'));
  const rank = (v: SpeechSynthesisVoice) => {
    const i = prefs.indexOf(v.lang.toLowerCase().replace('_', '-'));
    return (i < 0 ? prefs.length : i) * 2 + (QUALITY.test(v.name) ? 0 : 1);
  };
  return [...english].sort((a, b) => rank(a) - rank(b))[0];
}

/** The browser's voices; they load asynchronously in some browsers. */
export function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => (speechSupported ? window.speechSynthesis.getVoices() : []));
  useEffect(() => {
    if (!speechSupported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);
  return voices;
}

export interface PiperVoiceInfo {
  id: string; // e.g. en_US-lessac-medium
  language: string; // e.g. en_US
  quality: string;
}

export interface PiperState {
  available: boolean;
  voices: PiperVoiceInfo[];
  note: string; // why it is unavailable, e.g. "not installed"
  loaded: boolean;
}

/** Whether the local Piper server is available (the Node server starts it when installed). */
export function usePiper(): PiperState {
  const [state, setState] = useState<PiperState>({ available: false, voices: [], note: '', loaded: false });
  useEffect(() => {
    let off = false;
    let tries = 0;
    let timer = 0;
    const load = async () => {
      try {
        const d = await (await fetch('/api/tts/status')).json();
        if (off) return;
        setState({ available: !!d.available, voices: d.voices ?? [], note: d.note ?? '', loaded: true });
        // Piper can still be starting right after the server boots: check a few more times
        if (!d.available && d.note !== 'not installed' && ++tries < 8) timer = window.setTimeout(load, 2000);
      } catch {
        if (!off) setState((s) => ({ ...s, loaded: true }));
      }
    };
    void load();
    return () => {
      off = true;
      window.clearTimeout(timer);
    };
  }, []);
  return state;
}
