import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as api from './api';
import AudioSettings from './AudioSettings';
import Editor, { type EditorResult } from './Editor';
import { CloseIcon, EditIcon, FilterIcon, HeadphonesIcon, ListIcon, MenuIcon, MoonIcon, NextIcon, NoteIcon, PlayIcon, PlusIcon, PrevIcon, SearchIcon, SettingsIcon, StarIcon, SunIcon } from './Icons';
import Inline from './Inline';
import Markdown from './Markdown';
import Notes from './Notes';
import { warmMermaid } from './Mermaid';
import PlayerBar from './PlayerBar';
import Problems from './Problems';
import { Speaker, type SpeakOptions } from './speaker';
import { usePiper } from './speech';
import { buildSteps, type PlayerSettings } from './tts';
import { LEVELS, type FeedbackEntry, type FeedbackType, type Item, type Level, type Problem, type Question, type Topic, type View } from './types';
import { useLocal } from './useLocal';
import { usePlayer } from './usePlayer';

type ThemePref = 'system' | 'light' | 'dark';

const DEFAULT_SETTINGS: PlayerSettings = { rate: 1, voice: '', quiz: false, thinkSeconds: 8, gapSeconds: 2, autoNext: true, announceCode: true, follow: true, style: 'explain', engine: 'auto', piperVoice: '' };

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
  const [groupBy, setGroupBy] = useLocal<'level' | 'module'>('ip.group', 'level');
  const [moduleFilter, setModuleFilter] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemSel, setProblemSel] = useLocal<{ slug: string; part: string }>('ip.problem', { slug: '', part: 'overview' });
  const [codeLang, setCodeLang] = useLocal<string>('ip.codeLang', 'javascript');
  const [audioOpen, setAudioOpen] = useState(false);
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
  useEffect(() => { api.getProblems().then(setProblems).catch(() => {}); }, []);
  useEffect(() => { api.getFeedback().then(setFeedback).catch(() => {}); }, []);
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
      (!moduleFilter || (q.module ?? 'Other') === moduleFilter) &&
      (!needle || `${q.question} ${q.answer} ${q.tags.join(' ')} ${topic.name}`.toLowerCase().includes(needle)));
    // numbers match the Markdown pages inside a topic; elsewhere they are just list positions
    const numbered = view.kind === 'topic' ? out : out.map((it, i) => ({ ...it, number: i + 1 }));
    if (groupBy !== 'module') return numbered;
    // module view: modules in order of first appearance (so fundamentals come first), questions keep their level order inside
    const order = [...new Set(numbered.map((it) => it.q.module ?? 'Other'))];
    return order.flatMap((m) => numbered.filter((it) => (it.q.module ?? 'Other') === m));
  }, [topics, view, level, search, groupBy, moduleFilter]);

  // modules available in the current scope (ignoring the module filter itself) for the filter dropdown
  const modules = useMemo(() => {
    const scope = view.kind === 'topic' ? topics.filter((t) => t.slug === view.slug) : topics;
    return [...new Set(scope.flatMap((t) => t.questions.map((q) => q.module ?? 'Other')))].sort();
  }, [topics, view]);
  const groupOf = (it: Item) => (groupBy === 'module' ? it.q.module ?? 'Other' : it.q.level);
  const groupCounts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((it) => m.set(groupOf(it), (m.get(groupOf(it)) ?? 0) + 1));
    return m;
  }, [items, groupBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const selIndex = Math.max(0, items.findIndex((it) => it.q.id === selectedId));
  const selected: Item | undefined = items[selIndex];
  const favCount = useMemo(() => topics.reduce((n, t) => n + t.questions.filter((q) => q.favorite).length, 0), [topics]);

  // ---- audio ------
  const piper = usePiper();
  const speaker = useMemo(() => new Speaker(), []);
  const speakOptions = (): SpeakOptions => {
    const usePiperVoice = piper.available && settings.engine !== 'browser' && !speaker.piperBroken;
    const voice = piper.voices.find((v) => v.id === settings.piperVoice)?.id ?? piper.voices[0]?.id ?? '';
    return { engine: usePiperVoice ? 'piper' : 'browser', rate: settings.rate, browserVoice: settings.voice, piperVoice: voice };
  };
  const player = usePlayer({
    count: items.length,
    steps: (i) => buildSteps(items[i].number, items[i].q.question, items[i].q.answer, settings),
    onIndex: (i) => setSelectedId(items[i].q.id),
    settings: () => settings,
    speaker,
    speakOptions,
  });
  // changing the reading style mid-playback restarts the current question in the new style
  const firstStyle = useRef(settings.style);
  useEffect(() => {
    if (firstStyle.current === settings.style) return;
    firstStyle.current = settings.style;
    if (player.status === 'playing') player.play(player.index);
  }, [settings.style]); // eslint-disable-line react-hooks/exhaustive-deps
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

  const addNote = async (topic: string, e: { question: string | null; kind: 'note' | 'feedback'; type?: FeedbackType; text: string }) => {
    const created = await api.addFeedback({ topic, ...e });
    setFeedback((f) => [...f, created]);
  };
  const updateNote = async (id: string, patch: { status: 'open' | 'resolved' }) => {
    const updated = await api.updateFeedback(id, patch);
    setFeedback((f) => f.map((x) => (x.id === id ? updated : x)));
  };
  const deleteNote = async (id: string) => {
    await api.deleteFeedback(id);
    setFeedback((f) => f.filter((x) => x.id !== id));
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
  const title = view.kind === 'problems' ? 'Problems' : view.kind === 'favorites' ? 'Favorites' : view.kind === 'all' ? 'All questions' : topics.find((t) => t.slug === view.slug)?.name ?? '';
  const go = (v: View) => { setView(v); setModuleFilter(''); setDrawer(''); };
  const isView = (v: View) => v.kind === view.kind && (v.kind !== 'topic' || (view.kind === 'topic' && v.slug === view.slug));
  const nextTheme = () => setThemePref(themePref === 'system' ? (dark ? 'light' : 'dark') : themePref === 'dark' ? 'light' : 'dark');
  const openNotes = selected ? feedback.filter((f) => f.topic === selected.topic.slug && (f.question === selected.q.id || f.question === null) && f.status === 'open').length : 0;
  const activeFilters = (level ? 1 : 0) + (moduleFilter ? 1 : 0) + (groupBy === 'module' ? 1 : 0);
  const openQuestion = (id: string) => {
    const t = topics.find((x) => x.questions.some((q) => q.id === id));
    if (!t) return;
    setView({ kind: 'topic', slug: t.slug });
    setModuleFilter('');
    setLevel('');
    setSearch('');
    setSelectedId(id);
  };
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
          {problems.length > 0 && (
            <div className="nav-group">
              <button className={'nav' + (isView({ kind: 'problems' }) ? ' active' : '')} onClick={() => go({ kind: 'problems' })}>
                <span>Code problems</span><span className="count">{problems.length}</span>
              </button>
            </div>
          )}
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
            <span className="foot-icons">
              <button className="icon-btn" onClick={() => setAudioOpen(true)} aria-label="Audio settings" title="Audio settings"><SettingsIcon /></button>
              <button className="icon-btn" onClick={nextTheme} aria-label="Toggle theme" title={`Theme: ${themePref}`}>{dark ? <SunIcon /> : <MoonIcon />}</button>
            </span>
          </div>
        </nav>

        {view.kind === 'problems' ? (
          <Problems
            problems={problems}
            topics={topics}
            slug={problemSel.slug || problems[0]?.slug || ''}
            part={problemSel.part}
            language={codeLang}
            dark={dark}
            drawer={drawer === 'list'}
            onSelect={(slug, part) => { setProblemSel({ slug, part }); setDrawer(''); }}
            onLanguage={setCodeLang}
            onOpenQuestion={openQuestion}
            onCloseDrawer={() => setDrawer('')}
          />
        ) : (
          <>
        <section className={'list' + (drawer === 'list' ? ' open' : '')} aria-label="Questions">
          <div className="list-head">
            <div className="list-title">
              <h2>{title}</h2>
              <span>
                <button className="icon-btn" onClick={() => setEditor({ topicSlug: view.kind === 'topic' ? view.slug : topics[0]?.slug ?? '' })} aria-label="Add question" title="Add question"><PlusIcon /></button>
                <button className="icon-btn mobile-only" onClick={() => setDrawer('')} aria-label="Close"><CloseIcon /></button>
              </span>
            </div>
            <div className="search-row">
              <label className="search">
                <SearchIcon />
                <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search  ( / )" />
              </label>
              <button className={'icon-btn filter-btn' + (filtersOpen || activeFilters ? ' active' : '')} onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-label="Filters" title="Filters">
                <FilterIcon />{activeFilters > 0 && <span className="filter-count">{activeFilters}</span>}
              </button>
            </div>
            {filtersOpen && (<div className="filters">
            <div className="group-row">
              <div className="segmented" role="group" aria-label="Group by">
                <span>Group by</span>
                <button className={groupBy === 'level' ? 'active' : ''} onClick={() => setGroupBy('level')}>Level</button>
                <button className={groupBy === 'module' ? 'active' : ''} onClick={() => setGroupBy('module')}>Module</button>
              </div>
              {modules.length > 1 && (
                <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} aria-label="Filter by module">
                  <option value="">All modules</option>
                  {modules.map((m) => <option key={m}>{m}</option>)}
                </select>
              )}
            </div>
            <div className="chips" role="group" aria-label="Level">
              {(['', ...LEVELS] as const).map((l) => (
                <button key={l || 'all'} className={'chip' + (level === l ? ' active' : '')} onClick={() => setLevel(l)}>{l || 'All'}</button>
              ))}
            </div>
            {activeFilters > 0 && <button className="link-btn" onClick={() => { setLevel(''); setModuleFilter(''); setGroupBy('level'); }}>Clear filters</button>}
            </div>)}
          </div>
          <ol className="qlist">
            {items.map((it, i) => (
              <Fragment key={it.q.id}>
              {(i === 0 || groupOf(items[i - 1]) !== groupOf(it)) && (
                <li className="qgroup" aria-hidden="true">{groupOf(it)}<span>{groupCounts.get(groupOf(it))}</span></li>
              )}
              <li className="qrow">
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
              </Fragment>
            ))}
            {!items.length && <li className="empty">{loadError || (topics.length ? 'No questions match.' : 'Loading…')}</li>}
          </ol>
        </section>

        <main className="reader" ref={readerRef}>
          {selected ? (
            <article key={selected.q.id}>
              <div className="crumbs">
                <span>{selected.topic.name}</span>
                {selected.q.module && <button className="crumb-module" onClick={() => { setGroupBy('module'); setModuleFilter(selected.q.module ?? ''); }} title="Show only this module">{selected.q.module}</button>}
                <span className={'badge ' + selected.q.level}>{selected.q.level}</span>
                <span className="muted">#{selected.number}</span>
              </div>
              <h1><Inline text={selected.q.question} /></h1>
              <div className="actions">
                <button className="btn primary" onClick={() => player.play(selIndex)}><PlayIcon /> Listen</button>
                <button className={'btn' + (selected.q.favorite ? ' fav' : '')} onClick={() => toggleFav(selected)} aria-pressed={selected.q.favorite}>
                  <StarIcon filled={selected.q.favorite} /> {selected.q.favorite ? 'Favorite' : 'Favorite'}
                </button>
                <button className="btn" onClick={() => setEditor({ topicSlug: selected.topic.slug, question: selected.q })}><EditIcon /> Edit</button>
                <button className={'btn' + (notesOpen ? ' on' : '')} onClick={() => setNotesOpen(!notesOpen)} aria-expanded={notesOpen}>
                  <NoteIcon /> Notes{openNotes > 0 && <span className="btn-count">{openNotes}</span>}
                </button>
              </div>
              {notesOpen && (
                <Notes
                  topic={selected.topic}
                  question={selected.q}
                  entries={feedback.filter((f) => f.topic === selected.topic.slug)}
                  onAdd={(e) => addNote(selected.topic.slug, e)}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                />
              )}
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
        </main>
          </>
        )}
      </div>

      {player.status !== 'idle' && (
        <PlayerBar
          status={player.status}
          position={player.index + 1}
          total={items.length}
          now={player.now}
          countdown={player.countdown}
          rate={settings.rate}
          onRate={(rate) => setSettings({ ...settings, rate })}
          onPlay={() => player.play()}
          onPause={player.pause}
          onStop={player.stop}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onSettings={() => setAudioOpen(true)}
        />
      )}

      {audioOpen && (
        <AudioSettings settings={settings} piper={piper} engine={speakOptions().engine} onSettings={setSettings} onBeforeSample={player.pause} onClose={() => setAudioOpen(false)} />
      )}

      {editor && <Editor topics={topics} topicSlug={editor.topicSlug} question={editor.question} dark={dark} onSave={save} onDelete={editor.question ? () => { const it = items.find((x) => x.q.id === editor.question?.id); setEditor(null); if (it) void remove(it); } : undefined} onClose={() => setEditor(null)} />}
    </div>
  );
}
