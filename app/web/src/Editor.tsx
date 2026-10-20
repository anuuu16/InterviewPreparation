import { useState } from 'react';
import Markdown from './Markdown';
import { LEVELS, type Level, type Question, type Topic } from './types';
import { CloseIcon } from './Icons';

export interface EditorResult {
  topicSlug: string;
  data: Pick<Question, 'question' | 'answer' | 'level' | 'tags'> & { module: string };
}

interface Props {
  topics: Topic[];
  topicSlug: string;
  question?: Question;
  dark: boolean;
  onSave: (r: EditorResult) => Promise<void>;
  onDelete?: () => void; // only when editing an existing question
  onClose: () => void;
}

export default function Editor({ topics, topicSlug, question, dark, onSave, onDelete, onClose }: Props) {
  const [slug, setSlug] = useState(topicSlug);
  const [title, setTitle] = useState(question?.question ?? '');
  const [answer, setAnswer] = useState(question?.answer ?? '');
  const [level, setLevel] = useState<Level>(question?.level ?? 'basic');
  const [moduleName, setModuleName] = useState(question?.module ?? '');
  const [tags, setTags] = useState((question?.tags ?? []).join(', '));
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!title.trim()) return setError('Question is required');
    setBusy(true);
    try {
      await onSave({
        topicSlug: slug,
        data: { question: title, answer, level, module: moduleName, tags: tags.split(',').map((t) => t.trim()).filter(Boolean) },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save');
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={question ? 'Edit question' : 'Add question'}>
        <header>
          <h2>{question ? 'Edit question' : 'Add question'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>
        <div className="modal-body">
          <div className="field-row">
            <label>
              Topic
              <select value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!!question}>
                {topics.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
              </select>
            </label>
            <label>
              Level
              <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
          </div>
          <label>
            Question
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What is …?" autoFocus />
          </label>
          <label>
            Module (group within the topic)
            <input value={moduleName} onChange={(e) => setModuleName(e.target.value)} list="module-options" placeholder="Concurrency" />
            <datalist id="module-options">
              {[...new Set((topics.find((t) => t.slug === slug)?.questions ?? []).map((q) => q.module).filter(Boolean))].map((m) => <option key={m} value={m} />)}
            </datalist>
          </label>
          <label>
            Tags (comma separated)
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="concurrency, channels" />
          </label>
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'write'} onClick={() => setTab('write')}>Write</button>
            <button role="tab" aria-selected={tab === 'preview'} onClick={() => setTab('preview')}>Preview</button>
          </div>
          {tab === 'write' ? (
            <textarea className="mono" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer in Markdown…" rows={16} />
          ) : (
            <div className="preview"><Markdown source={answer || '_Nothing to preview yet._'} dark={dark} /></div>
          )}
          {error && <p className="error">{error}</p>}
        </div>
        <footer>
          {onDelete && <button className="btn danger" onClick={onDelete} style={{ marginRight: 'auto' }}>Delete question</button>}
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </footer>
      </div>
    </div>
  );
}
