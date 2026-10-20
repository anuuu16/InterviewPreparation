import type { Topic } from './types';
import type { ReadEntry } from './progress';
import { CloseIcon } from './Icons';
import { secondsToRead } from './useReadTracker';

interface Props {
  topics: Topic[];
  read: Record<string, ReadEntry>;
  autoTrack: boolean;
  onAutoTrack: (on: boolean) => void;
  counts: boolean;
  onCounts: (on: boolean) => void;
  onResetCounts: () => void;
  onClearModule: (topic: Topic, module: string) => void;
  onContinue: (topic: Topic) => void;
  onClearTopic: (topic: Topic) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const isRead = (read: Record<string, ReadEntry>, id: string) => !!read[id]?.at;

function Bar({ value, total }: { value: number; total: number }) {
  return <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemax={total}><i style={{ width: total ? `${(value / total) * 100}%` : 0 }} /></div>;
}

/** Overview of reading progress with per-topic bars, and the controls to pause or clear tracking. */
export default function ProgressDialog({ topics, read, autoTrack, onAutoTrack, counts, onCounts, onResetCounts, onClearModule, onContinue, onClearTopic, onClearAll, onClose }: Props) {
  const total = topics.reduce((n, t) => n + t.questions.length, 0);
  const done = topics.reduce((n, t) => n + t.questions.filter((q) => isRead(read, q.id)).length, 0);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal progress-modal" role="dialog" aria-modal="true" aria-label="My progress">
        <header>
          <h2>My progress</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <div className="modal-body">
          <div className="progress-total">
            <strong>{done} of {total} questions read</strong>
            <Bar value={done} total={total} />
          </div>

          {topics.map((t) => {
            const d = t.questions.filter((q) => isRead(read, q.id)).length;
            const mods = new Map<string, { done: number; total: number }>();
            t.questions.forEach((q) => {
              const m = q.module ?? 'Other';
              const cur = mods.get(m) ?? { done: 0, total: 0 };
              mods.set(m, { done: cur.done + (isRead(read, q.id) ? 1 : 0), total: cur.total + 1 });
            });
            return (
              <details key={t.slug} className="progress-topic">
                <summary>
                  <span className="pt-name">{t.name}</span>
                  <span className="muted">{d} / {t.questions.length}</span>
                  <Bar value={d} total={t.questions.length} />
                </summary>
                <ul className="pt-modules">
                  {[...mods].map(([m, v]) => (
                    <li key={m}>
                      <span>{m} <span className="muted">{v.done} / {v.total}</span></span>
                      {v.done > 0 ? <button className="link-btn" onClick={() => window.confirm(`Clear your progress for ${m}?`) && onClearModule(t, m)}>Clear</button> : <span />}
                      <Bar value={v.done} total={v.total} />
                    </li>
                  ))}
                </ul>
                <div className="pt-actions">
                  {d < t.questions.length && <button className="btn small primary" onClick={() => onContinue(t)}>Continue</button>}
                  {d > 0 && <button className="btn small" onClick={() => window.confirm(`Clear your progress for ${t.name}?`) && onClearTopic(t)}>Clear {t.name}</button>}
                </div>
              </details>
            );
          })}

          <label className="check progress-auto">
            <input type="checkbox" checked={autoTrack} onChange={(e) => onAutoTrack(e.target.checked)} />
            <span>
              Track my reading automatically
              <span className="hint">
                A question counts as read after you spend a fair time on it (about {Math.round(secondsToRead(250))} seconds for a typical answer, only while the tab is open and you are active) and scroll to the end,
                or listen to it from the start to the end. Clicking through questions quickly is never tracked. You can always mark a question yourself.
              </span>
            </span>
          </label>
          <label className="check progress-auto">
            <input type="checkbox" checked={counts} onChange={(e) => onCounts(e.target.checked)} />
            <span>
              Count how many times I read each question
              <span className="hint">Off by default. When on, reading a question again adds one, so you can see what you know well and switch to a quick read or a favorite.</span>
            </span>
          </label>
          {counts && <button className="btn small" onClick={() => window.confirm('Reset the read counts? Questions stay marked as read.') && onResetCounts()}>Reset read counts</button>}
          <p className="hint">Progress is saved only in this browser. Clearing site data removes it.</p>
          <button className="btn danger" onClick={() => window.confirm('Clear ALL your reading progress in this browser?') && onClearAll()}>Clear all progress</button>
        </div>
      </div>
    </div>
  );
}
