import { useState } from 'react';
import { CloseIcon } from './Icons';

interface Props {
  groups: string[];
  onCreate: (name: string, group: string) => Promise<void>;
  onClose: () => void;
}

const NEW_GROUP = '__new__';

/** Name a new topic and choose which sidebar group it belongs to. */
export default function NewTopicDialog({ groups, onCreate, onClose }: Props) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState(groups.includes('Tools & Observability') ? 'Tools & Observability' : groups[0] ?? '');
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const chosen = group === NEW_GROUP ? custom.trim() : group;
    if (!name.trim()) return setError('Give the topic a name');
    if (!chosen) return setError('Choose or name a group');
    setBusy(true);
    try {
      await onCreate(name.trim(), chosen);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the topic');
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal small-modal" role="dialog" aria-modal="true" aria-label="New topic">
        <header>
          <h2>New topic</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <form className="modal-body" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Datadog, WebSockets, My project notes" autoFocus />
          </label>
          <label>
            Group in the sidebar
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              {groups.map((g) => <option key={g}>{g}</option>)}
              <option value={NEW_GROUP}>New group…</option>
            </select>
          </label>
          {group === NEW_GROUP && (
            <label>
              New group name
              <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. My team" />
            </label>
          )}
          <p className="hint">Then add your own questions with the + button in the question list.</p>
          {error && <p className="error">{error}</p>}
        </form>
        <footer>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={() => void submit()} disabled={busy}>{busy ? 'Creating…' : 'Create topic'}</button>
        </footer>
      </div>
    </div>
  );
}
