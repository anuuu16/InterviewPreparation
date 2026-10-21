import Inline from './Inline';
import { HeadphonesIcon, PlayIcon, StarIcon, TrashIcon, EditIcon } from './Icons';
import type { Item, Problem, StudySet, Topic, View } from './types';

interface Props {
  topics: Topic[];
  problems: Problem[];
  sets: StudySet[];
  tracking: boolean;
  isRead: (id: string) => boolean;
  favCount: number;
  lastId: string;
  onGo: (v: View) => void;
  onOpenQuestion: (id: string) => void;
  onListenQuestion: (id: string) => void;
  onRenameSet: (id: string, name: string) => void;
  onRemoveSet: (id: string) => void;
}

/** Same question for everyone on the same day, so the card does not change on every refresh. */
function questionOfTheDay(topics: Topic[]): Item | null {
  const all = topics.flatMap((t) => t.questions.map((q) => ({ q, topic: t, number: 0 })));
  if (!all.length) return null;
  const d = new Date();
  const seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
  return all[(Math.imul(seed, 2654435761) >>> 0) % all.length];
}

export default function Dashboard({ topics, problems, sets, tracking, isRead, favCount, lastId, onGo, onOpenQuestion, onListenQuestion, onRenameSet, onRemoveSet }: Props) {
  const last = lastId ? topics.flatMap((t) => t.questions.map((q) => ({ q, topic: t }))).find((x) => x.q.id === lastId) : undefined;
  const qod = questionOfTheDay(topics);
  const total = topics.reduce((n, t) => n + t.questions.length, 0);

  return (
    <main className="reader page">
      <div className="page-inner">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-sub">{total} questions across {topics.length} topics{problems.length ? `, ${problems.length} code problems` : ''}. Read them or listen on the go.</p>

        <div className="cards two">
          {qod && (
            <section className="card">
              <h2>Question of the day</h2>
              <p className="card-q"><Inline text={qod.q.question} /></p>
              <p className="muted small">{qod.topic.name} · {qod.q.level}</p>
              <div className="actions">
                <button className="btn primary" onClick={() => onOpenQuestion(qod.q.id)}>Open</button>
                <button className="btn" onClick={() => onListenQuestion(qod.q.id)}><PlayIcon /> Listen</button>
              </div>
            </section>
          )}
          {last && (
            <section className="card">
              <h2>Continue where you left off</h2>
              <p className="card-q"><Inline text={last.q.question} /></p>
              <p className="muted small">{last.topic.name} · {last.q.level}</p>
              <div className="actions">
                <button className="btn primary" onClick={() => onOpenQuestion(last.q.id)}>Continue</button>
                <button className="btn" onClick={() => onListenQuestion(last.q.id)}><PlayIcon /> Listen</button>
              </div>
            </section>
          )}
        </div>

        <h2 className="section-title">Start here</h2>
        <div className="cards four">
          <button className="card action" onClick={() => onGo({ kind: 'interview' })}>
            <strong>Interview prep</strong>
            <span>Upload a resume and a job description. Get likely questions by round and a study set.</span>
          </button>
          {problems.length > 0 && (
            <button className="card action" onClick={() => onGo({ kind: 'problems' })}>
              <strong>Code problems</strong>
              <span>{problems.length} problems with guides and tested code in 7 languages.</span>
            </button>
          )}
          <button className="card action" onClick={() => onGo({ kind: 'favorites' })}>
            <strong><StarIcon filled /> Favorites</strong>
            <span>{favCount} starred question{favCount === 1 ? '' : 's'}.</span>
          </button>
          <button className="card action" onClick={() => onGo({ kind: 'all' })}>
            <strong><HeadphonesIcon /> All questions</strong>
            <span>Search, filter and listen to everything.</span>
          </button>
        </div>

        {sets.length > 0 && (
          <>
            <h2 className="section-title">Your study sets</h2>
            <ul className="set-list">
              {sets.map((s) => (
                <li key={s.id}>
                  <button className="set-open" onClick={() => onGo({ kind: 'set', id: s.id })}>
                    <strong>{s.name}</strong>
                    <span className="muted small">{s.ids.length} questions{s.note ? ` · ${s.note}` : ''}</span>
                  </button>
                  <button className="icon-btn" aria-label="Rename" title="Rename" onClick={() => { const n = window.prompt('Rename study set:', s.name); if (n) onRenameSet(s.id, n); }}><EditIcon /></button>
                  <button className="icon-btn" aria-label="Delete" title="Delete" onClick={() => { if (window.confirm(`Delete "${s.name}"? The questions stay in the bank.`)) onRemoveSet(s.id); }}><TrashIcon /></button>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className="section-title">Topics</h2>
        <div className="cards topics">
          {topics.map((t) => {
            const done = tracking ? t.questions.filter((q) => isRead(q.id)).length : 0;
            return (
              <button key={t.slug} className="card action topic-card" onClick={() => onGo({ kind: 'topic', slug: t.slug })}>
                <strong>{t.name}</strong>
                <span className="muted small">{tracking ? `${done} of ${t.questions.length} read` : `${t.questions.length} questions`}</span>
                {tracking && <span className="nav-bar"><i style={{ width: t.questions.length ? `${(done / t.questions.length) * 100}%` : 0 }} /></span>}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
