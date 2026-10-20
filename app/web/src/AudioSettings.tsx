import { useState } from 'react';
import type { PlayerSettings } from './tts';
import { useVoices, type PiperState } from './speech';
import VoicePicker from './VoicePicker';
import { CloseIcon } from './Icons';

interface Props {
  settings: PlayerSettings;
  piper: PiperState;
  engine: 'piper' | 'browser'; // engine actually in use
  onSettings: (s: PlayerSettings) => void;
  onBeforeSample: () => void; // pause reading before sampling voices
  onClose: () => void;
}

/** Audio preferences. Opened from the sidebar or the player bar; not part of the main screen. */
export default function AudioSettings({ settings, piper, engine, onSettings, onBeforeSample, onClose }: Props) {
  const [picker, setPicker] = useState(false);
  const voices = useVoices();
  const set = <K extends keyof PlayerSettings>(k: K, v: PlayerSettings[K]) => onSettings({ ...settings, [k]: v });

  const chosen = voices.find((v) => v.name === settings.voice);
  const piperId = piper.voices.find((v) => v.id === settings.piperVoice)?.id ?? piper.voices[0]?.id ?? '';
  const engineStatus =
    engine === 'piper' ? `Using Piper (local voice ${piperId})`
    : piper.available ? 'Piper is installed; using browser voices as chosen'
    : piper.loaded ? `Piper ${piper.note || 'not available'}; using browser voices. Run npm run tts:setup to install it (English only).`
    : 'Checking for Piper…';
  const voiceLabel = engine === 'piper' ? `${piperId} (Piper)` : chosen ? `${chosen.name} (${chosen.lang})` : settings.voice ? `${settings.voice} (not available here)` : 'Automatic (best English voice)';

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal audio-modal" role="dialog" aria-modal="true" aria-label="Audio settings">
        <header>
          <h2>Audio settings</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <div className="modal-body audio-body">
          <div className="voice-field">
            <span>Voice</span>
            <button className="btn voice-btn" onClick={() => { onBeforeSample(); setPicker(true); }}>
              <span>{voiceLabel}</span><span className="muted">Change…</span>
            </button>
            <span className="hint">{engineStatus}</span>
          </div>

          <label>
            Reading style
            <select value={settings.style} onChange={(e) => set('style', e.target.value as PlayerSettings['style'])}>
              <option value="explain">Explain: like a mentor talking you through it</option>
              <option value="brief">Brief: short answer and interview tip only</option>
              <option value="full">Full: read everything as written</option>
            </select>
          </label>
          <label>
            Speed: {settings.rate}×
            <input type="range" min={0.75} max={2} step={0.05} value={settings.rate} onChange={(e) => set('rate', +e.target.value)} />
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.autoNext} onChange={(e) => set('autoNext', e.target.checked)} />
            Continue to the next question automatically
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.quiz} onChange={(e) => set('quiz', e.target.checked)} />
            Quiz mode: ask, pause to think, then answer
          </label>
          {settings.quiz && (
            <label>
              Thinking time: {settings.thinkSeconds}s
              <input type="range" min={3} max={60} step={1} value={settings.thinkSeconds} onChange={(e) => set('thinkSeconds', +e.target.value)} />
            </label>
          )}
          <label>
            Pause between questions: {settings.gapSeconds}s
            <input type="range" min={0} max={15} step={1} value={settings.gapSeconds} onChange={(e) => set('gapSeconds', +e.target.value)} />
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.follow} onChange={(e) => set('follow', e.target.checked)} />
            Highlight and scroll to what is being read
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.announceCode} onChange={(e) => set('announceCode', e.target.checked)} />
            Mention code examples and diagrams
          </label>
          <label>
            Speech engine
            <select value={settings.engine} onChange={(e) => set('engine', e.target.value as PlayerSettings['engine'])}>
              <option value="auto">Automatic: Piper if installed, else browser</option>
              <option value="piper">Piper (local neural voice)</option>
              <option value="browser">Browser voices</option>
            </select>
          </label>
          <p className="hint">
            Tip: hover (or tap) any paragraph in an answer and press ▶ to listen from there. Code and diagrams are never read out.
            Keys: Space play/pause, ← → previous/next, F favourite, / search.
          </p>
        </div>
      </div>
      {picker && (
        <VoicePicker
          current={settings.voice}
          rate={settings.rate}
          onSelect={(voice) => set('voice', voice)}
          piper={piper}
          piperVoice={settings.piperVoice}
          engine={engine}
          onSelectPiper={(id) => set('piperVoice', id)}
          onClose={() => setPicker(false)}
        />
      )}
    </div>
  );
}
