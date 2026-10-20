import { useState } from 'react';
import type { FeedbackEntry, FeedbackType, Question, Topic } from './types';

interface Props {
  topic: Topic;
  question: Question;
  entries: FeedbackEntry[]; // all entries for this topic
  onAdd: (e: { question: string | null; kind: 'note' | 'feedback'; type?: FeedbackType; text: string }) => Promise<void>;
  onUpdate: (id: string, patch: { status: 'open' | 'resolved' }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TYPE_LABEL: Record<FeedbackType, string> = {
  'more-detail': 'Needs more detail',
  'code-issue': 'Code issue',
  incorrect: 'Incorrect',
  unclear: 'Unclear',
  missing: 'Missing something',
  other: 'Other',
};

/** Personal notes, and feedback that the next agent run will pick up (`npm run feedback`). */
export default function Notes({ topic, question, entries, onAdd, onUpdate, onDelete }: Props) {
  const [kind, setKind] = useState<'note' | 'feedback'>('note');
  const [type, setType] = useState<FeedbackType>('more-detail');
  const [scope, setScope] = useState<'question' | 'topic'>('question');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const mine = entries.filter((e) => e.question === question.id || e.question === null);
  const ordered = [...mine].sort((a, b) => Number(a.status === 'resolved') - Number(b.status === 'resolved') || b.createdAt.localeCompare(a.createdAt));

  const add = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      await onAdd({ question: scope === 'question' ? question.id : null, kind, type: kind === 'feedback' ? type : undefined, text });
      setText('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="notes" aria-label="Notes and feedback">
      <div className="notes-form">
        <div className="segmented" role="group" aria-label="Kind">
          <button className={kind === 'note' ? 'active' : ''} onClick={() => setKind('note')}>My note</button>
          <button className={kind === 'feedback' ? 'active' : ''} onClick={() => setKind('feedback')}>Feedback for the author</button>
        </div>
        <p className="hint">
          {kind === 'note' ? 'A private study note. It stays in the repo but is never acted on.' : 'The next agent run lists this (npm run feedback), fixes the answer, and marks it resolved.'}
        </p>
        <div className="notes-row">
          {kind === 'feedback' && (
            <select value={type} onChange={(e) => setType(e.target.value as FeedbackType)} aria-label="Feedback type">
              {(Object.keys(TYPE_LABEL) as FeedbackType[]).map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
            </select>
          )}
          <select value={scope} onChange={(e) => setScope(e.target.value as 'question' | 'topic')} aria-label="About">
            <option value="question">About this question</option>
            <option value="topic">About the whole topic ({topic.name})</option>
          </select>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={kind === 'note' ? 'Write a note…' : 'What should change? e.g. “add a real-life example”, “the Go code in step 3 does not compile”'} />
        <button className="btn primary" onClick={add} disabled={busy || !text.trim()}>{kind === 'note' ? 'Save note' : 'Send feedback'}</button>
      </div>

      {ordered.length > 0 && (
        <ul className="notes-list">
          {ordered.map((e) => (
            <li key={e.id} className={'note-item' + (e.status === 'resolved' ? ' resolved' : '')}>
              <div className="note-meta">
                <span className={'badge-lite ' + e.kind}>{e.kind === 'note' ? 'Note' : TYPE_LABEL[e.type ?? 'other']}</span>
                <span className="muted">{e.question === null ? 'whole topic' : 'this question'} · {new Date(e.createdAt).toLocaleDateString()}</span>
                {e.status === 'resolved' && <span className="badge-lite done">Resolved</span>}
              </div>
              <p>{e.text}</p>
              {e.resolution && <p className="resolution"><strong>Fixed:</strong> {e.resolution}</p>}
              <div className="note-actions">
                {e.kind === 'feedback' && (
                  <button className="link-btn" onClick={() => onUpdate(e.id, { status: e.status === 'open' ? 'resolved' : 'open' })}>
                    {e.status === 'open' ? 'Mark resolved' : 'Reopen'}
                  </button>
                )}
                <button className="link-btn danger-link" onClick={() => onDelete(e.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
