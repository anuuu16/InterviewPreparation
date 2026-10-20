import type { Topic } from './types';
import { CloseIcon } from './Icons';

export interface Layout {
  list: 'left' | 'right' | 'hidden'; // where the question list sits, next to the reader
  sidebar: boolean; // show the topics menu on wide screens
}
export interface Hidden {
  topics: string[]; // topic slugs
  modules: string[]; // "<topic slug>/<module>"
}
export const DEFAULT_LAYOUT: Layout = { list: 'left', sidebar: true };
export const DEFAULT_HIDDEN: Hidden = { topics: [], modules: [] };
export const moduleKey = (slug: string, module: string) => `${slug}/${module}`;

interface Props {
  topics: Topic[]; // all topics, unfiltered
  layout: Layout;
  hidden: Hidden;
  onLayout: (l: Layout) => void;
  onHidden: (h: Hidden) => void;
  tracking: boolean;
  onTracking: (on: boolean) => void;
  onClose: () => void;
}

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

/** Two simple things: where the panels go, and which topics and modules to show. */
export default function ViewDialog({ topics, layout, hidden, onLayout, onHidden, tracking, onTracking, onClose }: Props) {
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="View options">
        <header>
          <h2>View options</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <div className="modal-body">
          <div className="view-row">
            <span>Question list</span>
            <div className="segmented" role="group" aria-label="Question list position">
              {(['left', 'right', 'hidden'] as const).map((p) => (
                <button key={p} className={layout.list === p ? 'active' : ''} onClick={() => onLayout({ ...layout, list: p })}>{p === 'left' ? 'Left' : p === 'right' ? 'Right' : 'Hidden'}</button>
              ))}
            </div>
          </div>
          <div className="view-row">
            <span>Topics menu</span>
            <div className="segmented" role="group" aria-label="Topics menu">
              <button className={layout.sidebar ? 'active' : ''} onClick={() => onLayout({ ...layout, sidebar: true })}>Show</button>
              <button className={!layout.sidebar ? 'active' : ''} onClick={() => onLayout({ ...layout, sidebar: false })}>Hidden</button>
            </div>
          </div>
          <p className="hint">Layout applies on wide screens. On a phone the panels are drawers.</p>

          <label className="check">
            <input type="checkbox" checked={tracking} onChange={(e) => onTracking(e.target.checked)} />
            <span>Track my reading progress <span className="hint">Off by default to keep things simple. When on, you get read marks, progress bars, and an optional read counter (open it from the sidebar).</span></span>
          </label>

          <h3 className="view-h">Show only what I am preparing</h3>
          <p className="hint">Untick a topic or a module to hide it everywhere. Nothing is deleted, and your progress is kept.</p>
          {topics.map((t) => {
            const mods = [...new Set(t.questions.map((q) => q.module ?? 'Other'))];
            const topicHidden = hidden.topics.includes(t.slug);
            return (
              <details key={t.slug} className="view-topic">
                <summary>
                  <label className="check" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={!topicHidden} onChange={() => onHidden({ ...hidden, topics: toggle(hidden.topics, t.slug) })} />
                    <span>{t.name}</span>
                  </label>
                  <span className="muted">{t.questions.length}</span>
                </summary>
                <ul className="view-modules">
                  {mods.map((m) => (
                    <li key={m}>
                      <label className="check">
                        <input type="checkbox" disabled={topicHidden} checked={!topicHidden && !hidden.modules.includes(moduleKey(t.slug, m))} onChange={() => onHidden({ ...hidden, modules: toggle(hidden.modules, moduleKey(t.slug, m)) })} />
                        <span>{m}</span>
                      </label>
                      <span className="muted">{t.questions.filter((q) => (q.module ?? 'Other') === m).length}</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
          {(hidden.topics.length > 0 || hidden.modules.length > 0) && <button className="btn small" onClick={() => onHidden(DEFAULT_HIDDEN)}>Show everything</button>}
        </div>
      </div>
    </div>
  );
}
