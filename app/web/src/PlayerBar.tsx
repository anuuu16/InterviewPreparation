import { useEffect, useState } from 'react';
import type { PlayerSettings } from './tts';
import type { Status } from './usePlayer';
import { speechSupported } from './usePlayer';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, SettingsIcon, StopIcon } from './Icons';

interface Props {
  status: Status;
  position: number; // 1-based
  total: number;
  now: { text: string; part?: 'question' | 'answer' } | null;
  countdown: number | null;
  settings: PlayerSettings;
  onSettings: (s: PlayerSettings) => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (!speechSupported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);
  return voices;
}

export default function PlayerBar(p: Props) {
  const [open, setOpen] = useState(false);
  const voices = useVoices();
  const set = <K extends keyof PlayerSettings>(k: K, v: PlayerSettings[K]) => p.onSettings({ ...p.settings, [k]: v });

  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const list = english.length ? english : voices;
  const playing = p.status === 'playing';

  const caption =
    p.status === 'idle'
      ? 'Press play to listen to the questions and answers.'
      : p.countdown !== null && p.now && !p.now.part
        ? `${p.now.text}… ${p.countdown}s`
        : p.now?.text ?? '';

  return (
    <footer className="player" aria-label="Audio player">
      {open && (
        <div className="settings" role="dialog" aria-label="Playback settings">
          <label>
            Voice
            <select value={p.settings.voice} onChange={(e) => set('voice', e.target.value)}>
              <option value="">Browser default</option>
              {list.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
            </select>
          </label>
          <label className="check">
            <input type="checkbox" checked={p.settings.autoNext} onChange={(e) => set('autoNext', e.target.checked)} />
            Continue to the next question automatically
          </label>
          <label className="check">
            <input type="checkbox" checked={p.settings.quiz} onChange={(e) => set('quiz', e.target.checked)} />
            Quiz mode: ask, pause to think, then answer
          </label>
          {p.settings.quiz && (
            <label>
              Thinking time: {p.settings.thinkSeconds}s
              <input type="range" min={3} max={60} step={1} value={p.settings.thinkSeconds} onChange={(e) => set('thinkSeconds', +e.target.value)} />
            </label>
          )}
          <label>
            Pause between questions: {p.settings.gapSeconds}s
            <input type="range" min={0} max={15} step={1} value={p.settings.gapSeconds} onChange={(e) => set('gapSeconds', +e.target.value)} />
          </label>
          <label className="check">
            <input type="checkbox" checked={p.settings.announceCode} onChange={(e) => set('announceCode', e.target.checked)} />
            Mention code examples and diagrams
          </label>
          <label className="check">
            <input type="checkbox" checked={p.settings.follow} onChange={(e) => set('follow', e.target.checked)} />
            Follow along: highlight and scroll to the block being read
          </label>
          <p className="hint">Hover (or tap) any paragraph, list, table or code block in an answer and press ▶ to start listening from there. Code and diagrams are never read out. Shortcuts: Space play/pause, ← → previous/next, F favourite, / search.</p>
        </div>
      )}

      <div className="transport">
        <button className="icon-btn" onClick={p.onPrev} aria-label="Previous question" title="Previous (←)"><PrevIcon /></button>
        <button className="play-btn" onClick={playing ? p.onPause : p.onPlay} disabled={!speechSupported || p.total === 0}
          aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause (Space)' : 'Play (Space)'}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="icon-btn" onClick={p.onNext} aria-label="Next question" title="Next (→)"><NextIcon /></button>
        <button className="icon-btn" onClick={p.onStop} disabled={p.status === 'idle'} aria-label="Stop" title="Stop"><StopIcon /></button>
      </div>

      <div className="now" aria-live="polite">
        {!speechSupported ? (
          <span>Your browser does not support speech synthesis.</span>
        ) : (
          <>
            {p.status !== 'idle' && (
              <span className="now-label">{p.status === 'paused' ? 'Paused' : p.now?.part === 'question' ? 'Question' : p.now?.part === 'answer' ? 'Answer' : 'Up next'}</span>
            )}
            <span className="now-text">{caption}</span>
          </>
        )}
      </div>

      <div className="player-right">
        <span className="pos">{p.total ? `${p.position} / ${p.total}` : '–'}</span>
        <select aria-label="Speed" value={p.settings.rate} onChange={(e) => set('rate', +e.target.value)}>
          {[0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2].map((r) => <option key={r} value={r}>{r}×</option>)}
        </select>
        <button className={'icon-btn' + (open ? ' active' : '')} onClick={() => setOpen(!open)} aria-label="Playback settings" aria-expanded={open}><SettingsIcon /></button>
      </div>
    </footer>
  );
}
