import { useEffect, useState } from 'react';
import type { PlayerSettings } from './tts';
import type { Status } from './usePlayer';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, SettingsIcon, CloseIcon, UpIcon, DownIcon } from './Icons';

interface Props {
  status: Status; // never 'idle': the bar is only shown while listening
  position: number; // 1-based
  total: number;
  now: { text: string; part?: 'question' | 'answer' } | null;
  countdown: number | null;
  rate: PlayerSettings['rate'];
  onRate: (r: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSettings: () => void;
}

/** True on phone-sized screens, where the player starts as a small button. */
function useSmallScreen() {
  const query = '(max-width: 700px)';
  const [small, setSmall] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setSmall(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return small;
}

/**
 * Compact controls shown only while something is being read aloud. Closing it stops playback.
 * On phones it starts as a small floating play/pause button; the arrow expands the full controls.
 */
export default function PlayerBar(p: Props) {
  const playing = p.status === 'playing';
  const small = useSmallScreen();
  const [open, setOpen] = useState(false);
  const label = p.status === 'paused' ? 'Paused' : p.now?.part === 'question' ? 'Question' : p.now?.part === 'answer' ? 'Answer' : 'Up next';
  const caption = p.countdown !== null && p.now && !p.now.part ? `${p.now.text}… ${p.countdown}s` : p.now?.text ?? '';

  if (small && !open) {
    return (
      <div className="player-mini" role="group" aria-label="Audio player">
        <button className="play-btn" onClick={playing ? p.onPause : p.onPlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label="Show player controls" title="Show controls"><UpIcon /></button>
      </div>
    );
  }

  return (
    <footer className={'player' + (small ? ' sheet' : '')} aria-label="Audio player">
      <div className="transport">
        <button className="icon-btn" onClick={p.onPrev} aria-label="Previous question" title="Previous (←)"><PrevIcon /></button>
        <button className="play-btn" onClick={playing ? p.onPause : p.onPlay} aria-label={playing ? 'Pause' : 'Play'} title={playing ? 'Pause (Space)' : 'Play (Space)'}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="icon-btn" onClick={p.onNext} aria-label="Next question" title="Next (→)"><NextIcon /></button>
      </div>

      <div className="now" aria-live="polite">
        <span className="now-label">{label}</span>
        <span className="now-text">{caption}</span>
      </div>

      <div className="player-right">
        <span className="pos">{p.position} / {p.total}</span>
        <select aria-label="Speed" value={p.rate} onChange={(e) => p.onRate(+e.target.value)}>
          {[0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2].map((r) => <option key={r} value={r}>{r}×</option>)}
        </select>
        <button className="icon-btn" onClick={p.onSettings} aria-label="Audio settings" title="Audio settings"><SettingsIcon /></button>
        {small && <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Shrink player" title="Shrink"><DownIcon /></button>}
        <button className="icon-btn" onClick={p.onStop} aria-label="Close player" title="Stop and close"><CloseIcon /></button>
      </div>
    </footer>
  );
}
