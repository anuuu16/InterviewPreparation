import { useEffect, useMemo, useRef, useState } from 'react';
import { CloseIcon, PlayIcon, SearchIcon, StopIcon } from './Icons';
import { compareVoices, familyOf, isNovelty, languageName, pickDefaultVoice, sampleText, speechSupported, useVoices, type PiperState } from './speech';
import { Speaker } from './speaker';

interface Props {
  current: string; // saved browser voice name, '' = automatic
  rate: number;
  onSelect: (voiceName: string) => void;
  piper: PiperState;
  piperVoice: string; // saved Piper voice id, '' = first installed
  engine: 'piper' | 'browser'; // engine currently in use
  onSelectPiper: (id: string) => void;
  onClose: () => void;
}

export default function VoicePicker({ current, rate, onSelect, piper, piperVoice, engine, onSelectPiper, onClose }: Props) {
  const voices = useVoices();
  const auto = useMemo(() => pickDefaultVoice(voices), [voices]);
  const active = voices.find((v) => v.name === current);

  const [query, setQuery] = useState('');
  const [family, setFamily] = useState(() => (active ? familyOf(active.lang) : 'en'));
  const [tab, setTab] = useState<'piper' | 'browser'>(engine);
  const [sampling, setSampling] = useState<string | null>(null); // voiceURI (or "piper:<id>") being sampled
  const token = useRef(0);
  const speaker = useRef(new Speaker()).current;
  const activePiper = piper.voices.find((v) => v.id === piperVoice)?.id ?? piper.voices[0]?.id ?? '';

  const stopSample = () => {
    token.current += 1;
    speaker.cancel();
    if (speechSupported) window.speechSynthesis.cancel();
    setSampling(null);
  };
  useEffect(() => () => { speaker.cancel(); if (speechSupported) window.speechSynthesis.cancel(); }, [speaker]);

  const samplePiper = (id: string, language: string) => {
    const key = `piper:${id}`;
    if (sampling === key) return stopSample();
    stopSample();
    setSampling(key);
    speaker.speak(sampleText(language), { engine: 'piper', rate, browserVoice: '', piperVoice: id }, () => setSampling(null));
  };

  const sample = (v: SpeechSynthesisVoice) => {
    if (sampling === v.voiceURI) return stopSample();
    stopSample();
    const my = token.current;
    setSampling(v.voiceURI);
    window.setTimeout(() => {
      if (my !== token.current) return;
      const u = new SpeechSynthesisUtterance(sampleText(v.lang));
      u.voice = v;
      u.lang = v.lang;
      u.rate = rate;
      const done = () => my === token.current && setSampling(null);
      u.onend = done;
      u.onerror = done;
      window.speechSynthesis.speak(u);
    }, 40);
  };

  const families = useMemo(() => {
    const counts = new Map<string, number>();
    voices.forEach((v) => counts.set(familyOf(v.lang), (counts.get(familyOf(v.lang)) ?? 0) + 1));
    return [...counts.entries()]
      .map(([code, n]) => ({ code, n, name: languageName(code) }))
      .sort((a, b) => (a.code === 'en' ? -1 : b.code === 'en' ? 1 : a.name.localeCompare(b.name)));
  }, [voices]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const shown = voices.filter(
      (v) => (!family || familyOf(v.lang) === family) && (!q || `${v.name} ${v.lang} ${languageName(v.lang)}`.toLowerCase().includes(q)),
    );
    const byLang = new Map<string, SpeechSynthesisVoice[]>();
    for (const v of shown) byLang.set(v.lang, [...(byLang.get(v.lang) ?? []), v]);
    return [...byLang.entries()]
      .map(([lang, list]) => ({ lang, name: languageName(lang), list: list.sort(compareVoices) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [voices, family, query]);

  const choose = (name: string) => {
    stopSample();
    onSelect(name);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && (stopSample(), onClose())}>
      <div className="modal voice-modal" role="dialog" aria-modal="true" aria-label="Voice and language">
        <header>
          <h2>Voice &amp; language</h2>
          <button className="icon-btn" onClick={() => { stopSample(); onClose(); }} aria-label="Close"><CloseIcon /></button>
        </header>

        <div className="tabs voice-tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'piper'} onClick={() => { stopSample(); setTab('piper'); }}>
            Piper (local){piper.available ? '' : ' · not installed'}
          </button>
          <button role="tab" aria-selected={tab === 'browser'} onClick={() => { stopSample(); setTab('browser'); }}>Browser voices</button>
        </div>

        {tab === 'piper' && (
          <div className="voice-list">
            <p className="voice-hint">
              Piper is a fast offline neural voice that sounds more natural and consistent than most browser voices. When it is not available the app uses your browser voices automatically.
            </p>
            {!piper.available && (
              <div className="voice-row">
                <div className="voice-info">
                  <strong>Piper is not available{piper.note ? ` (${piper.note})` : ''}</strong>
                  <span className="muted">Install English only: run <code>npm run tts:setup</code> in the project folder, then restart <code>npm start</code>.</span>
                </div>
              </div>
            )}
            {piper.voices.map((v) => (
              <div key={v.id} className={'voice-row' + (v.id === activePiper ? ' selected' : '')}>
                <div className="voice-info">
                  <strong>{v.id}</strong>
                  <span className="muted">{languageName(v.language)} · {v.quality || 'voice'} · runs on this computer</span>
                </div>
                <div className="voice-actions">
                  <button className="btn small" onClick={() => samplePiper(v.id, v.language)} aria-label={`Play sample of ${v.id}`}>
                    {sampling === `piper:${v.id}` ? <StopIcon /> : <PlayIcon />} Sample
                  </button>
                  <button className={'btn small' + (v.id === activePiper ? ' primary' : '')} onClick={() => onSelectPiper(v.id)}>
                    {v.id === activePiper ? 'Default ✓' : 'Set as default'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'browser' && (<>
        <div className="voice-tools">
          <label className="search">
            <SearchIcon />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search voices or languages" autoFocus />
          </label>
          <select value={family} onChange={(e) => setFamily(e.target.value)} aria-label="Language">
            <option value="">All languages ({voices.length})</option>
            {families.map((f) => <option key={f.code} value={f.code}>{f.name} ({f.n})</option>)}
          </select>
        </div>
        <p className="voice-hint">
          The questions are written in English, so an English voice reads them best. Your choice is remembered in this browser.
          Voices come from your browser and operating system; install more in your system settings.
        </p>

        <div className="voice-list">
          {!speechSupported && <p className="empty">This browser does not support speech synthesis.</p>}
          {speechSupported && !voices.length && <p className="empty">No voices found yet. They can take a moment to load.</p>}

          {voices.length > 0 && (
            <div className={'voice-row' + (current === '' ? ' selected' : '')}>
              <div className="voice-info">
                <strong>Automatic</strong>
                <span className="muted">{auto ? `Best English voice: ${auto.name} (${auto.lang})` : 'Browser default voice'}</span>
              </div>
              <div className="voice-actions">
                {auto && (
                  <button className="btn small" onClick={() => sample(auto)} aria-label="Play sample">
                    {sampling === auto.voiceURI ? <StopIcon /> : <PlayIcon />} Sample
                  </button>
                )}
                <button className={'btn small' + (current === '' ? ' primary' : '')} onClick={() => choose('')}>{current === '' ? 'Default ✓' : 'Use'}</button>
              </div>
            </div>
          )}

          {groups.map((g) => (
            <section key={g.lang}>
              <h3>{g.name} <span className="muted">{g.lang}</span></h3>
              {g.list.map((v) => (
                <div key={v.voiceURI} className={'voice-row' + (v.name === current ? ' selected' : '')}>
                  <div className="voice-info">
                    <strong>{v.name}</strong>
                    <span className="muted">{v.localService ? 'On this device' : 'Online'}{v.default ? ' · system default' : ''}{isNovelty(v) ? ' · novelty voice' : ''}</span>
                  </div>
                  <div className="voice-actions">
                    <button className="btn small" onClick={() => sample(v)} aria-label={`Play sample of ${v.name}`}>
                      {sampling === v.voiceURI ? <StopIcon /> : <PlayIcon />} Sample
                    </button>
                    <button className={'btn small' + (v.name === current ? ' primary' : '')} onClick={() => choose(v.name)}>
                      {v.name === current ? 'Default ✓' : 'Set as default'}
                    </button>
                  </div>
                </div>
              ))}
            </section>
          ))}
          {voices.length > 0 && !groups.length && <p className="empty">No voices match.</p>}
        </div>
        </>)}
      </div>
    </div>
  );
}
