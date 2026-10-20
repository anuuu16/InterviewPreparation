import { useState } from 'react';
import { CloseIcon, PlusIcon } from './Icons';
import type { Resource, ResourceType } from './types';

export const TYPE_LABEL: Record<ResourceType, string> = {
  'official-docs': 'Official docs', reference: 'Reference', tutorial: 'Tutorial', course: 'Course', book: 'Book', article: 'Article', video: 'Video', tool: 'Tool', repo: 'Repository',
};
const ORDER: ResourceType[] = ['official-docs', 'reference', 'tutorial', 'course', 'book', 'article', 'video', 'tool', 'repo'];

const host = (url: string) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
};

function Row({ r, onRemove }: { r: Resource; onRemove?: () => void }) {
  return (
    <li className="res-row">
      <div>
        <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
        <span className="muted res-host">{host(r.url)}{r.level ? ` · ${r.level}` : ''}</span>
        <p>{r.description}</p>
      </div>
      {onRemove && <button className="link-btn danger-link" onClick={onRemove} aria-label={`Remove ${r.title}`}>Remove</button>}
    </li>
  );
}

/** Compact links under an answer: resources for the question's module. */
export function FurtherReading({ items, onAll }: { items: Resource[]; onAll: () => void }) {
  return (
    <aside className="further" aria-label="Further reading">
      <strong>Further reading</strong>
      <ul>
        {items.map((r) => (
          <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a><span className="muted"> · {TYPE_LABEL[r.type]}</span></li>
        ))}
      </ul>
      <button className="link-btn" onClick={onAll}>All resources</button>
    </aside>
  );
}

/** All resources for a topic, grouped by type, with a simple way to add or remove one. */
export function ResourcesDialog({ title, items, onAdd, onRemove, onClose }: { title: string; items: Resource[]; onAdd: (r: Resource) => Promise<void>; onRemove: (url: string) => Promise<void>; onClose: () => void }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Resource>({ title: '', url: '', type: 'article', description: '' });
  const [error, setError] = useState('');

  const save = async () => {
    try {
      await onAdd(form);
      setForm({ title: '', url: '', type: 'article', description: '' });
      setAdding(false);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save');
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal res-modal" role="dialog" aria-modal="true" aria-label={`${title} resources`}>
        <header>
          <h2>{title}: resources</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <div className="modal-body">
          <p className="hint">Where to read more at the source. Official docs and references come first.</p>
          {ORDER.map((type) => {
            const group = items.filter((r) => r.type === type);
            return group.length ? (
              <section key={type}>
                <h3 className="res-type">{TYPE_LABEL[type]}</h3>
                <ul className="res-list">{group.map((r) => <Row key={r.url} r={r} onRemove={() => onRemove(r.url)} />)}</ul>
              </section>
            ) : null;
          })}
          {!items.length && <p className="muted">No resources yet.</p>}

          {adding ? (
            <div className="res-form">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input placeholder="https://…" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ResourceType })}>
                {ORDER.map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
              </select>
              <input placeholder="What will the reader find here? (one sentence)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              {error && <p className="error">{error}</p>}
              <div><button className="btn primary" onClick={save}>Add resource</button> <button className="btn" onClick={() => setAdding(false)}>Cancel</button></div>
            </div>
          ) : (
            <button className="btn" onClick={() => setAdding(true)}><PlusIcon /> Add a resource</button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Read-only list used at the end of a problem guide. */
export function ResourceList({ items }: { items: Resource[] }) {
  if (!items.length) return null;
  return (
    <section className="further-list">
      <h2>Further reading</h2>
      <ul className="res-list">{items.map((r) => <Row key={r.url} r={r} />)}</ul>
    </section>
  );
}
