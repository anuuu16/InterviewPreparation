import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as api from './api';
import Editor, { type EditorResult } from './Editor';
import { CloseIcon, EditIcon, HeadphonesIcon, ListIcon, MenuIcon, MoonIcon, NextIcon, PlayIcon, PlusIcon, PrevIcon, SearchIcon, StarIcon, SunIcon, TrashIcon } from './Icons';
import Inline from './Inline';
import Markdown from './Markdown';
import { warmMermaid } from './Mermaid';
import PlayerBar from './PlayerBar';
import { buildSteps, type PlayerSettings } from './tts';
import { LEVELS, type Item, type Level, type Question, type Topic, type View } from './types';
import { useLocal } from './useLocal';
import { usePlayer } from './usePlayer';

type ThemePref = 'system' | 'light' | 'dark';

const DEFAULT_SETTINGS: PlayerSettings = { rate: 1, voice: '', quiz: false, thinkSeconds: 8, gapSeconds: 2, autoNext: true, announceCode: true, follow: true };

function useDark(pref: ThemePref) {
  const [system, setSystem] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setSystem(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const dark = pref === 'system' ? system : pref === 'dark';
  useEffect(() => {
    const root = document.documentElement;
    if (pref === 'system') delete root.dataset.theme;
    else root.dataset.theme = pref;
  }, [pref]);
  return dark;
}

export default function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadError, setLoadError] = useState('');
  const [view, setView] = useLocal<View>('ip.view', { kind: 'all' });
  const [level, setLevel] = useState<Level | ''>('');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useLocal<string>('ip.selected', '');
  const [themePref, setThemePref] = useLocal<ThemePref>('ip.theme', 'system');
  const [settings, setSettings] = useLocal<PlayerSettings>('ip.player', DEFAULT_SETTINGS);
  const [drawer, setDrawer] = useState<'' | 'topics' | 'list'>('');
  const [editor, setEditor] = useState<{ topicSlug: string; question?: Question } | null>(null);
  const dark = useDark(themePref);
  const readerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const reload = useCallback(() => api.getAll().then(setTopics).catch((e: Error) => setLoadError(e.message)), []);
  useEffect(() => { void reload(); }, [reload]);
  useEffect(() => { const t = window.setTimeout(warmMermaid, 800); return () => window.clearTimeout(t); }, []);

  // ---- derive the visible list ------------------------------------------------------------
  const items = useMemo<Item[]>(() => {
    const scope = view.kind === 'topic' ? topics.filter((t) => t.slug === view.slug) : topics;
    const all: Item[] = [];
    for (const t of scope) {
      const ordered = LEVELS.flatMap((l) => t.questions.filter((q) => q.level === l));
      ordered.forEach((q, i) => all.push({ q, topic: t, number: i + 1 }));
    }
    const needle = search.trim().toLowerCase();
    const out = all.filter(({ q, topic }) =>
      (view.kind !== 'favorites' || q.favorite) &&
      (!level || q.level === level) &&
      (!needle || `${q.question} ${q.answer} ${q.tags.join(' ')} ${topic.name}`.toLowerCase().includes(needle)));
    // numbers match the Markdown pages inside a topic; elsewhere they are just list positions
    return view.kind === 'topic' ? out : out.map((it, i) => ({ ...it, number: i + 1 }));
  }, [topics, view, level, search]);

  const selIndex = Math.max(0, items.findIndex((it) => it.q.id === selectedId));
  const selected: Item | undefined = items[selIndex];
  const favCount = useMemo(() => topics.reduce((n, t) => n + t.questions.filter((q) => q.favorite).length, 0), [topics]);

  // ---- audio ------------------------------------------------------------------------------
  const player = usePlayer({
    count: items.length,
    steps: (i) => buildSteps(items[i].number, items[i].q.question, items[i].q.answer, settings),
    onIndex: (i) => setSelectedId(items[i].q.id),
    settings: () => settings,
  });
  const listKey = items.map((it) => it.q.id).join('|');
  useEffect(() => { player.stop(); }, [listKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const select = (i: number) => {
    if (!items[i]) return;
    if (player.status === 'idle') setSelectedId(items[i].q.id);
    else player.play(i);
    setDrawer('');
  };
  const step = (d: number) => select(Math.min(items.length - 1, Math.max(0, selIndex + d)));

  // keep the selected question visible in the list and start the reader at the top
  useEffect(() => {
    document.querySelector('.qitem.active')?.scrollIntoView({ block: 'nearest' });
    readerRef.current?.scrollTo({ top: 0 });
  }, [selected?.q.id]);

  // ---- mutations --------------------------------------------------------------------------
  const patch = (slug: string, id: string, fn: (q: Question) => Question) =>
    setTopics((ts) => ts.map((t) => (t.slug === slug ? { ...t, questions: t.questions.map((q) => (q.id === id ? fn(q) : q)) } : t)));

  const toggleFav = async (it: Item) => {
    const next = !it.q.favorite;
    patch(it.topic.slug, it.q.id, (q) => ({ ...q, favorite: next }));
    try { await api.updateQuestion(it.topic.slug, it.q.id, { favorite: next }); } catch { void reload(); }
  };

  const save = async (r: EditorResult) => {
    if (editor?.question) await api.updateQuestion(r.topicSlug, editor.question.id, r.data);
    else {
      const created = await api.addQuestion(r.topicSlug, r.data);
      setSelectedId(created.id);
    }
    await reload();
    setEditor(null);
  };

  const remove = async (it: Item) => {
    if (!window.confirm(`Delete this question?\n\n${it.q.question}`)) return;
    await api.deleteQuestion(it.topic.slug, it.q.id);
    await reload();
  };

  const newTopic = async () => {
    const name = window.prompt('New topic name (e.g. TypeScript, System Design):')?.trim();
    if (!name) return;
    try {
      const t = await api.createTopic(name);
      await reload();
      setView({ kind: 'topic', slug: t.slug });
    } catch (e) { window.alert(e instanceof Error ? e.message : 'Could not create topic'); }
  };

  // ---- keyboard shortcuts -----------------------------------------------------------------
  const keys = useRef<(e: KeyboardEvent) => void>(() => {});
  keys.current = (e) => {
    const t = e.target as HTMLElement;
    if (t.matches('input, textarea, select, [contenteditable]') || e.metaKey || e.ctrlKey || e.altKey || editor) return;
    if (e.key === ' ' && !t.matches('button, a')) {
      e.preventDefault();
      if (player.status === 'playing') player.pause();
      else player.play(player.status === 'paused' ? undefined : selIndex);
    } else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key.toLowerCase() === 'f' && selected) void toggleFav(selected);
    else if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); }
  };
  useEffect(() => {
    const on = (e: KeyboardEvent) => keys.current(e);
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  // ---- render -----------------------------------------------------------------------------
  const title = view.kind === 'favorites' ? 'Favorites' : view.kind === 'all' ? 'All questions' : topics.find((t) => t.slug === view.slug)?.name ?? '';
  const go = (v: View) => { setView(v); setDrawer(''); };
  const isView = (v: View) => v.kind === view.kind && (v.kind !== 'topic' || (view.kind === 'topic' && v.slug === view.slug));
  const nextTheme = () => setThemePref(themePref === 'system' ? (dark ? 'light' : 'dark') : themePref === 'dark' ? 'light' : 'dark');
  const playingId = player.status === 'playing' ? items[player.index]?.q.id : undefined;

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setDrawer('topics')} aria-label="Topics"><MenuIcon /></button>
        <strong>{title}</strong>
        <button className="icon-btn" onClick={() => setDrawer('list')} aria-label="Questions"><ListIcon /></button>
      </header>

      <div className="panes">
        {drawer && <div className="backdrop" onClick={() => setDrawer('')} />}

        <nav className={'sidebar' + (drawer === 'topics' ? ' open' : '')} aria-label="Topics">
          <div className="brand"><HeadphonesIcon /> Interview Prep</div>
          <div className="nav-group">
            <button className={'nav' + (isView({ kind: 'all' }) ? ' active' : '')} onClick={() => go({ kind: 'all' })}>All questions</button>
            <button className={'nav' + (isView({ kind: 'favorites' }) ? ' active' : '')} onClick={() => go({ kind: 'favorites' })}>
              <span>Favorites</span><span className="count">{favCount}</span>
            </button>
          </div>
          <div className="nav-title">Topics</div>
          <div className="nav-group">
            {topics.map((t) => (
              <button key={t.slug} className={'nav' + (isView({ kind: 'topic', slug: t.slug }) ? ' active' : '')} onClick={() => go({ kind: 'topic', slug: t.slug })}>
                <span>{t.name}</span><span className="count">{t.questions.length}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-foot">
            <button className="btn" onClick={newTopic}><PlusIcon /> New topic</button>
            <button className="icon-btn" onClick={nextTheme} aria-label="Toggle theme" title={`Theme: ${themePref}`}>{dark ? <SunIcon /> : <MoonIcon />}</button>
          </div>
        </nav>

        <section className={'list' + (drawer === 'list' ? ' open' : '')} aria-label="Questions">
          <div className="list-head">
            <div className="list-title">
              <h2>{title}</h2>
              <button className="icon-btn mobile-only" onClick={() => setDrawer('')} aria-label="Close"><CloseIcon /></button>
            </div>
            <label className="search">
              <SearchIcon />
              <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions, answers, tags  ( / )" />
            </label>
            <div className="chips" role="group" aria-label="Level">
              {(['', ...LEVELS] as const).map((l) => (
                <button key={l || 'all'} className={'chip' + (level === l ? ' active' : '')} onClick={() => setLevel(l)}>{l || 'All'}</button>
              ))}
            </div>
          </div>
          <ol className="qlist">
            {items.map((it, i) => (
              <li key={it.q.id} className="qrow">
                <button className={'qitem' + (it.q.id === selected?.q.id ? ' active' : '')} onClick={() => select(i)}>
                  <span className="qnum">{it.q.id === playingId ? <span className="eq" aria-label="Playing"><i /><i /><i /></span> : it.number}</span>
                  <span className="qtext">
                    <span className="qtitle"><Inline text={it.q.question} /></span>
                    <span className="qmeta">
                      <span className={'dot ' + it.q.level} />{it.q.level}
                      {view.kind !== 'topic' && <> · {it.topic.name}</>}
                    </span>
                  </span>
                  {it.q.favorite && <span className="qstar"><StarIcon filled /></span>}
                </button>
                <button className="qplay" onClick={() => { player.play(i); setDrawer(''); }} aria-label={`Play question ${it.number}`} title="Play from this question"><PlayIcon /></button>
              </li>
            ))}
            {!items.length && <li className="empty">{loadError || (topics.length ? 'No questions match.' : 'Loading…')}</li>}
          </ol>
        </section>

        <main className="reader" ref={readerRef}>
          {selected ? (
            <article key={selected.q.id}>
              <div className="crumbs">
                <span>{selected.topic.name}</span>
                <span className={'badge ' + selected.q.level}>{selected.q.level}</span>
                <span className="muted">#{selected.number}</span>
              </div>
              <h1><Inline text={selected.q.question} /></h1>
              <div className="actions">
                <button className="btn primary" onClick={() => player.play(selIndex)}><PlayIcon /> Listen from here</button>
                <button className={'btn' + (selected.q.favorite ? ' fav' : '')} onClick={() => toggleFav(selected)}>
                  <StarIcon filled={selected.q.favorite} /> {selected.q.favorite ? 'Favorited' : 'Favorite'}
                </button>
                <button className="btn" onClick={() => setEditor({ topicSlug: selected.topic.slug, question: selected.q })}><EditIcon /> Edit</button>
                <button className="btn danger" onClick={() => remove(selected)} aria-label="Delete"><TrashIcon /></button>
              </div>
              <Markdown
                source={selected.q.answer}
                dark={dark}
                onPlayBlock={(b) => player.play(selIndex, b)}
                activeBlock={player.status !== 'idle' && player.index === selIndex && player.now?.part === 'answer' ? player.now.block ?? null : null}
                follow={settings.follow}
              />
              {selected.q.tags.length > 0 && (
                <div className="tags">{selected.q.tags.map((t) => <button key={t} className="tag" onClick={() => setSearch(t)}>#{t}</button>)}</div>
              )}
              <nav className="pager">
                <button className="btn" onClick={() => step(-1)} disabled={selIndex === 0}><PrevIcon /> Previous</button>
                <button className="btn" onClick={() => step(1)} disabled={selIndex >= items.length - 1}>Next <NextIcon /></button>
              </nav>
            </article>
          ) : (
            <div className="empty-state">
              <h1>{loadError ? 'Could not load questions' : 'Nothing to show'}</h1>
              <p>{loadError || 'Pick a topic or clear the filters.'}</p>
            </div>
          )}
          <button className="fab" onClick={() => setEditor({ topicSlug: view.kind === 'topic' ? view.slug : topics[0]?.slug ?? '' })} aria-label="Add question" title="Add question"><PlusIcon /></button>
        </main>
      </div>

      <PlayerBar
        status={player.status}
        position={items.length ? (player.status === 'idle' ? selIndex : player.index) + 1 : 0}
        total={items.length}
        now={player.now}
        countdown={player.countdown}
        settings={settings}
        onSettings={setSettings}
        onPlay={() => player.play(player.status === 'paused' ? undefined : selIndex)}
        onPause={player.pause}
        onStop={player.stop}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />

      {editor && <Editor topics={topics} topicSlug={editor.topicSlug} question={editor.question} dark={dark} onSave={save} onClose={() => setEditor(null)} />}
    </div>
  );
}
