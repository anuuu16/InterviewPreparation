import { useMemo, useRef, useState } from 'react';
import Inline from '../Inline';
import { useLocal } from '../useLocal';
import { LEVELS, type Level, type StudySet, type Topic } from '../types';
import { SAMPLE_JD, SAMPLE_RESUME, aiPrompt, buildPlan, buildSet, type Plan, type SetOptions } from './analyze';
import { readFileText } from './readFile';

interface Props {
  topics: Topic[];
  onOpenQuestion: (id: string) => void;
  onCreateSet: (name: string, ids: string[], note: string) => StudySet;
  onOpenSet: (id: string) => void;
}

interface Saved { resume: string; jd: string }
const DEFAULT_OPTS: SetOptions = { perSkill: 5, levels: [...LEVELS], techLead: true, gapBoost: true, behavioral: true };

function FileInput({ label, onText, onError }: { label: string; onText: (t: string) => void; onError: (m: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept=".txt,.md,.pdf,text/plain,application/pdf" hidden onChange={async (e) => {
        const f = e.target.files?.[0];
        e.target.value = '';
        if (!f) return;
        try { onText(await readFileText(f)); onError(''); } catch (err) { onError(err instanceof Error ? err.message : 'Could not read the file'); }
      }} />
      <button className="btn small" type="button" onClick={() => ref.current?.click()}>{label}</button>
    </>
  );
}

export default function InterviewView({ topics, onOpenQuestion, onCreateSet, onOpenSet }: Props) {
  const [saved, setSaved] = useLocal<Saved>('ip.interview.v1', { resume: '', jd: '' });
  const [plan, setPlan] = useState<Plan | null>(null);
  const [opts, setOpts] = useState<SetOptions>(DEFAULT_OPTS);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const ids = useMemo(() => (plan ? buildSet(plan, topics, opts) : []), [plan, topics, opts]);
  const byTopic = useMemo(() => {
    const index = new Map(topics.flatMap((t) => t.questions.map((q) => [q.id, { t, q }] as const)));
    const m = new Map<string, Map<string, number>>();
    for (const id of ids) {
      const hit = index.get(id);
      if (!hit) continue;
      const mod = hit.q.module ?? 'Other';
      const mm = m.get(hit.t.name) ?? new Map<string, number>();
      mm.set(mod, (mm.get(mod) ?? 0) + 1);
      m.set(hit.t.name, mm);
    }
    return m;
  }, [ids, topics]);
  const titleOf = useMemo(() => new Map(topics.flatMap((t) => t.questions.map((q) => [q.id, q.question] as const))), [topics]);

  const analyze = () => { setPlan(buildPlan(saved.resume, saved.jd, topics)); setOpen({}); setCopied(false); };
  const toggleLevel = (l: Level) => setOpts((o) => ({ ...o, levels: o.levels.includes(l) ? o.levels.filter((x) => x !== l) : [...o.levels, l] }));
  const copy = async () => {
    try { await navigator.clipboard.writeText(aiPrompt(saved.resume, saved.jd)); setCopied(true); } catch { setError('Could not copy. Select the text manually.'); }
  };
  const create = () => {
    if (!plan || !ids.length) return;
    const defaultName = plan.roleTitle ? `Prep: ${plan.roleTitle}` : 'Interview prep set';
    const set = onCreateSet(name.trim() || defaultName, ids, 'from resume and job description');
    onOpenSet(set.id);
  };
  const empty = !saved.resume.trim() && !saved.jd.trim();

  return (
    <main className="reader page">
      <div className="page-inner">
        <h1 className="page-title">Interview prep</h1>
        <p className="page-sub">Add your resume and the job description. The app compares the skills, suggests questions for each interview round, and can build a study set from the question bank. It runs in your browser: nothing is uploaded and no AI service is used.</p>

        <div className="cards two">
          <section className="card">
            <h2>Resume</h2>
            <textarea className="mono" rows={9} value={saved.resume} onChange={(e) => setSaved({ ...saved, resume: e.target.value })} placeholder="Paste your resume text, or upload a PDF or text file" />
            <div className="actions"><FileInput label="Upload PDF or text" onText={(t) => setSaved({ ...saved, resume: t })} onError={setError} /></div>
          </section>
          <section className="card">
            <h2>Job description</h2>
            <textarea className="mono" rows={9} value={saved.jd} onChange={(e) => setSaved({ ...saved, jd: e.target.value })} placeholder="Paste the job description, or upload a PDF or text file" />
            <div className="actions"><FileInput label="Upload PDF or text" onText={(t) => setSaved({ ...saved, jd: t })} onError={setError} /></div>
          </section>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button className="btn primary" disabled={empty} onClick={analyze}>Analyze</button>
          <button className="btn" onClick={() => setSaved({ resume: SAMPLE_RESUME, jd: SAMPLE_JD })}>Use sample</button>
          <button className="btn" disabled={empty} onClick={() => { setSaved({ resume: '', jd: '' }); setPlan(null); }}>Clear</button>
          <button className="btn" disabled={empty} onClick={copy}>{copied ? 'Copied' : 'Copy as AI prompt'}</button>
        </div>
        <p className="muted small">Your text is kept in this browser only, so you can come back to it. Clear removes it.</p>

        {plan && (
          <>
            <h2 className="section-title">Analysis{plan.roleTitle ? `: ${plan.roleTitle}` : ''}</h2>
            <div className="stats">
              {plan.matchPercent !== null && <div className="stat-box"><b>{plan.matchPercent}%</b><span>skills match</span></div>}
              {plan.resumeYears !== null && <div className="stat-box"><b>{plan.resumeYears}</b><span>years on resume{plan.jdYears ? ` (asked: ${plan.jdYears})` : ''}</span></div>}
              <div className="stat-box"><b>{plan.matched.length}</b><span>matched</span></div>
              <div className="stat-box"><b>{plan.gaps.length}</b><span>gaps</span></div>
            </div>
            {([['Matched', plan.matched, 'good'], ['Gaps to prepare', plan.gaps, 'bad'], ['Extra on your resume', plan.extras, 'muted']] as const).map(([label, hits, tone]) => hits.length > 0 && (
              <div key={label} className="skill-row">
                <span className="muted small">{label}</span>
                <div className="chips">{hits.map((h) => <span key={h.skill.id} className={'tag ' + tone}>{h.skill.name}{!h.required && tone !== 'muted' ? ' (preferred)' : ''}</span>)}</div>
              </div>
            ))}
            {plan.flags.length > 0 && (
              <div className="card flags"><h2>Resume timeline: expect questions on this</h2><ul>{plan.flags.map((f) => <li key={f}>{f}</li>)}</ul></div>
            )}

            <h2 className="section-title">Questions by round</h2>
            {plan.rounds.map((r) => {
              const isOpen = open[r.id] ?? false;
              const groups = [...new Set(r.items.map((i) => i.group ?? ''))];
              return (
                <section key={r.id} className="card round">
                  <button className="round-head" aria-expanded={isOpen} onClick={() => setOpen({ ...open, [r.id]: !isOpen })}>
                    <strong>{r.title}</strong><span className="count">{r.items.length}</span>
                  </button>
                  <p className="muted small">{r.blurb}</p>
                  {isOpen && groups.map((g) => (
                    <div key={g}>
                      {g && <h3 className="group-title">{g}</h3>}
                      <ul className="plan-list">
                        {r.items.filter((i) => (i.group ?? '') === g).map((i, n) => (
                          <li key={`${i.text}-${n}`}>
                            {i.qid ? <button className="link-btn" onClick={() => onOpenQuestion(i.qid!)}><Inline text={titleOf.get(i.qid) ?? i.text} /></button> : <span><Inline text={i.text} /></span>}
                            {i.why && <span className="muted small"> {i.why}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            })}

            <h2 className="section-title">Make a study set from the question bank</h2>
            <section className="card">
              <div className="opt-row">
                <span className="muted small">Questions per skill</span>
                <div className="chips">{[3, 5, 8].map((n) => <button key={n} className={'chip' + (opts.perSkill === n ? ' active' : '')} onClick={() => setOpts({ ...opts, perSkill: n })}>{n}</button>)}</div>
              </div>
              <div className="opt-row">
                <span className="muted small">Levels</span>
                <div className="chips">{LEVELS.map((l) => <button key={l} className={'chip' + (opts.levels.includes(l) ? ' active' : '')} onClick={() => toggleLevel(l)}>{l}</button>)}</div>
              </div>
              <label className="check"><input type="checkbox" checked={opts.techLead} onChange={(e) => setOpts({ ...opts, techLead: e.target.checked })} /> Include Tech Lead questions</label>
              <label className="check"><input type="checkbox" checked={opts.gapBoost} onChange={(e) => setOpts({ ...opts, gapBoost: e.target.checked })} /> Add more questions for my gaps</label>
              <label className="check"><input type="checkbox" checked={opts.behavioral} onChange={(e) => setOpts({ ...opts, behavioral: e.target.checked })} /> Add behavioural basics</label>
              <p><b>{ids.length}</b> questions selected{byTopic.size ? ':' : '.'}</p>
              {[...byTopic].map(([t, mods]) => (
                <p key={t} className="muted small"><b>{t}</b>: {[...mods].map(([m, n]) => `${m} (${n})`).join(', ')}</p>
              ))}
              <input className="set-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={plan.roleTitle ? `Prep: ${plan.roleTitle}` : 'Name of the set'} aria-label="Study set name" />
              <div className="actions"><button className="btn primary" disabled={!ids.length} onClick={create}>Create and open</button></div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
