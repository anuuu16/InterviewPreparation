import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as api from './api';
import { features } from './features';
import AudioSettings from './AudioSettings';
import Editor, { type EditorResult } from './Editor';
import { BookIcon, CheckIcon, CloseIcon, EditIcon, FilterIcon, HeadphonesIcon, LayoutIcon, MoonIcon, NextIcon, NoteIcon, PlayIcon, PlusIcon, PrevIcon, ProgressIcon, SearchIcon, SettingsIcon, StarIcon, SunIcon, TrashIcon, UpIcon, DownIcon } from './Icons';
import Inline from './Inline';
import NewTopicDialog from './NewTopicDialog';
import { groupTopics } from './groups';
import Markdown from './Markdown';
import Notes from './Notes';
import { warmMermaid } from './Mermaid';
import Select from './Select';
import PlayerBar from './PlayerBar';
import ProgressDialog from './ProgressDialog';
import ViewDialog, { DEFAULT_HIDDEN, DEFAULT_LAYOUT, moduleKey, type Hidden, type Layout } from './ViewDialog';
import { useProgress } from './progress';
import { useReadTracker } from './useReadTracker';
import { FurtherReading, ResourcesDialog } from './Resources';
import Problems from './Problems';
import Dashboard from './Dashboard';
import InterviewView from './interview/InterviewView';
import { useStudySets } from './studySets';
import ReadRail from './ReadRail';
import { Speaker, type SpeakOptions } from './speaker';
import { usePiper } from './speech';
import { buildSteps, type PlayerSettings } from './tts';
import { LEVELS, type FeedbackEntry, type FeedbackType, type Item, type Level, type Problem, type Question, type Resource, type Topic, type View } from './types';
import { useLocal } from './useLocal';
import { usePlayer } from './usePlayer';

type ThemePref = 'system' | 'light' | 'dark';

const DEFAULT_SETTINGS: PlayerSettings = { rate: 1, voice: '', quiz: false, thinkSeconds: 8, gapSeconds: 2, autoNext: true, announceCode: true, follow: true, style: 'explain', engine: 'auto', piperVoice: '', sleepMinutes: 0 };

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
  const [allTopics, setTopics] = useState<Topic[]>([]);
  const [loadError, setLoadError] = useState('');
  const [view, setView] = useLocal<View>('ip.view', { kind: 'home' });
  const [level, setLevel] = useState<Level | ''>('');
  const [groupBy, setGroupBy] = useLocal<'level' | 'module'>('ip.group', 'level');
  const [moduleFilter, setModuleFilter] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [resources, setResources] = useState<Record<string, Resource[]>>({});
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [problemSel, setProblemSel] = useLocal<{ slug: string; part: string }>('ip.problem', { slug: '', part: 'overview' });
  const [codeLang, setCodeLang] = useLocal<string>('ip.codeLang', 'javascript');
  const [audioOpen, setAudioOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [layout, setLayout] = useLocal<Layout>('ip.layout2', DEFAULT_LAYOUT);
  const [hidden, setHidden] = useLocal<Hidden>('ip.hidden', DEFAULT_HIDDEN);
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [collapsedGroups, setCollapsedGroups] = useLocal<string[]>('ip.collapsedGroups', []);
  const [newTopicOpen, setNewTopicOpen] = useState(false);
  const [tracking, setTracking] = useLocal<boolean>('ip.tracking', false); // progress is opt-in, off by default
  const [readFilter, setReadFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [toast, setToast] = useState<{ id: string; text: string } | null>(null);
  const progress = useProgress();
  const studySets = useStudySets();
  const [pendingPlay, setPendingPlay] = useState('');
  const problemsReaderRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useLocal<string>('ip.selected', '');
  const [themePref, setThemePref] = useLocal<ThemePref>('ip.theme', 'system');
  const [settings, setSettings] = useLocal<PlayerSettings>('ip.player', DEFAULT_SETTINGS);
  const [drawer, setDrawer] = useState<'' | 'topics' | 'list'>('');
  const [editor, setEditor] = useState<{ topicSlug: string; question?: Question } | null>(null);
  const dark = useDark(themePref);
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 1100px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  // Compact header/footer appear only while their full versions are off screen, so never both at once.
  const [fullHeadVisible, setFullHeadVisible] = useState(true); // title + action buttons at the top of the answer
  const [pagerVisible, setPagerVisible] = useState(false); // Previous/Next row at the end of the answer
  // the side the question list was last on (default: right); survives a reload while the list is hidden
  const lastListSide = useRef<'left' | 'right'>(((): 'left' | 'right' => { try { return localStorage.getItem('ip.listSide') === 'left' ? 'left' : 'right'; } catch { return 'right'; } })());
  const touch = useRef<{ x: number; y: number } | null>(null);
  const readerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // hidden topics and modules are removed here, so every list, count and filter below only sees what the reader chose
  const topics = useMemo<Topic[]>(
    () => allTopics
      .filter((t) => !hidden.topics.includes(t.slug))
      .map((t) => ({ ...t, questions: t.questions.filter((q) => !hidden.modules.includes(moduleKey(t.slug, q.module ?? 'Other'))) }))
      .filter((t) => t.questions.length > 0 || !allTopics.find((a) => a.slug === t.slug)?.questions.length),
    [allTopics, hidden],
  );
  useEffect(() => {
    if (view.kind === 'topic' && allTopics.length && !topics.some((t) => t.slug === view.slug)) setView({ kind: 'home' });
    if (view.kind === 'set' && !studySets.sets.some((x) => x.id === view.id)) setView({ kind: 'home' });
    if ((view.kind === 'interview' && !features.interviewPrep) || (view.kind === 'set' && !features.studySets)) setView({ kind: 'home' });
  }, [topics, studySets.sets]); // eslint-disable-line react-hooks/exhaustive-deps

  const reload = useCallback(() => api.getAll().then(setTopics).catch((e: Error) => setLoadError(e.message)), []);
  useEffect(() => { void reload(); }, [reload]);
  useEffect(() => { api.getGroups().then(setGroupOrder).catch(() => {}); }, []);
  useEffect(() => { api.getResources().then(setResources).catch(() => {}); }, []);
  useEffect(() => { api.getProblems().then(setProblems).catch(() => {}); }, []);
  useEffect(() => { api.getFeedback().then(setFeedback).catch(() => {}); }, []);
  useEffect(() => { const t = window.setTimeout(warmMermaid, 800); return () => window.clearTimeout(t); }, []);

  // The Unread/Read filter uses a snapshot, so the list does not change under you while you read.
  const readSnapshot = useMemo(
    () => new Set(Object.keys(progress.state.read).filter((id) => progress.state.read[id].at)),
    [readFilter, view, topics, groupBy, level, moduleFilter, search], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ---- derive the visible list ------------------------------------------------------------
  const items = useMemo<Item[]>(() => {
    const scope = view.kind === 'topic' ? topics.filter((t) => t.slug === view.slug) : topics;
    let all: Item[] = [];
    for (const t of scope) {
      const ordered = LEVELS.flatMap((l) => t.questions.filter((q) => q.level === l));
      ordered.forEach((q, i) => all.push({ q, topic: t, number: i + 1 }));
    }
    if (view.kind === 'set') {
      // a study set keeps the order it was made in
      const byId = new Map(all.map((it) => [it.q.id, it]));
      all = (studySets.sets.find((x) => x.id === view.id)?.ids ?? []).map((id) => byId.get(id)).filter((it): it is Item => !!it);
    }
    const needle = search.trim().toLowerCase();
    const out = all.filter(({ q, topic }) =>
      (view.kind !== 'favorites' || q.favorite) &&
      (!level || q.level === level) &&
      (!moduleFilter || (q.module ?? 'Other') === moduleFilter) &&
      (!tracking || readFilter === 'all' || (readFilter === 'read') === readSnapshot.has(q.id)) &&
      (!needle || `${q.question} ${q.answer} ${q.tags.join(' ')} ${topic.name}`.toLowerCase().includes(needle)));
    // numbers match the Markdown pages inside a topic; elsewhere they are just list positions
    const numbered = view.kind === 'topic' ? out : out.map((it, i) => ({ ...it, number: i + 1 }));
    if (groupBy !== 'module') return numbered;
    // module view: modules in order of first appearance (so fundamentals come first), questions keep their level order inside
    const order = [...new Set(numbered.map((it) => it.q.module ?? 'Other'))];
    return order.flatMap((m) => numbered.filter((it) => (it.q.module ?? 'Other') === m));
  }, [topics, view, level, search, groupBy, moduleFilter, readFilter, readSnapshot, tracking, studySets.sets]);

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
  // What the player reads: the visible questions, or in the Problems view every guide and approach.
  const inProblems = view.kind === 'problems';
  const problemParts = useMemo(
    () => problems.flatMap((p) => [
      { id: `problem:${p.slug}`, slug: p.slug, part: 'overview', title: `${p.title}: the guide`, body: p.overview },
      ...p.variants.map((v) => ({ id: `problem:${p.slug}/${v.slug}`, slug: p.slug, part: v.slug, title: `${p.title}: ${v.title}`, body: v.notes })),
    ]),
    [problems],
  );
  const readables = useMemo(
    () => (inProblems
      ? problemParts.map((x, i) => ({ id: x.id, number: i + 1, title: x.title, body: x.body }))
      : items.map((it) => ({ id: it.q.id, number: it.number, title: it.q.question, body: it.q.answer }))),
    [inProblems, problemParts, items],
  );
  const curProblem = problemSel.slug || problems[0]?.slug || '';
  const problemIndex = Math.max(0, problemParts.findIndex((x) => x.slug === curProblem && x.part === problemSel.part));
  const curIndex = inProblems ? problemIndex : selIndex;
  const piper = usePiper();
  const speaker = useMemo(() => new Speaker(), []);
  const speakOptions = (): SpeakOptions => {
    const usePiperVoice = piper.available && settings.engine !== 'browser' && !speaker.piperBroken;
    const voice = piper.voices.find((v) => v.id === settings.piperVoice)?.id ?? piper.voices[0]?.id ?? '';
    return { engine: usePiperVoice ? 'piper' : 'browser', rate: settings.rate, browserVoice: settings.voice, piperVoice: voice };
  };
  const player = usePlayer({
    count: readables.length,
    steps: (i) => buildSteps(readables[i].number, readables[i].title, readables[i].body, settings, inProblems ? 'part' : 'question'),
    onIndex: (i) => { if (inProblems) setProblemSel({ slug: problemParts[i].slug, part: problemParts[i].part }); else setSelectedId(items[i].q.id); },
    settings: () => settings,
    speaker,
    speakOptions,
    onDone: (i) => {
      const r = readables[i];
      if (r && tracking && progress.state.autoTrack && settings.style !== 'brief' && progress.markRead(r.id, 'audio')) setToast({ id: r.id, text: 'Marked as read' });
    },
  });
  // changing the reading style mid-playback restarts the current question in the new style
  const firstStyle = useRef(settings.style);
  useEffect(() => {
    if (firstStyle.current === settings.style) return;
    firstStyle.current = settings.style;
    if (player.status === 'playing') player.play(player.index);
  }, [settings.style]); // eslint-disable-line react-hooks/exhaustive-deps
  const listKey = readables.map((r) => r.id).join('|');
  useEffect(() => { player.stop(); }, [listKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // "Listen" on the home page opens the question first, then starts playing once the list has switched
  useEffect(() => {
    if (!pendingPlay || view.kind !== 'topic') return;
    const i = items.findIndex((it) => it.q.id === pendingPlay);
    if (i < 0) return;
    setPendingPlay('');
    player.play(i);
  }, [pendingPlay, items, view]); // eslint-disable-line react-hooks/exhaustive-deps

  const select = (i: number) => {
    if (!readables[i]) return;
    if (player.status !== 'idle') player.play(i);
    else if (inProblems) setProblemSel({ slug: problemParts[i].slug, part: problemParts[i].part });
    else setSelectedId(items[i].q.id);
    setDrawer('');
  };
  const step = (d: number) => select(Math.min(readables.length - 1, Math.max(0, curIndex + d)));

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

  const addResource = async (key: string, r: Resource) => {
    const created = await api.addResource(key, r);
    setResources((all) => ({ ...all, [key]: [...(all[key] ?? []), created] }));
  };
  const removeResource = async (key: string, url: string) => {
    await api.removeResource(key, url);
    setResources((all) => ({ ...all, [key]: (all[key] ?? []).filter((x) => x.url !== url) }));
  };

  const newTopic = () => setNewTopicOpen(true);
  const createTopicIn = async (name: string, group: string) => {
    const t = await api.createTopic(name, group);
    const gs = await api.getGroups().catch(() => groupOrder);
    setGroupOrder(gs);
    await reload();
    setCollapsedGroups((c) => c.filter((x) => x !== group));
    setNewTopicOpen(false);
    setView({ kind: 'topic', slug: t.slug });
  };

  // ---- reading progress -------------------------------------------------------------------
  const inQuestions = view.kind !== 'problems' && view.kind !== 'home' && view.kind !== 'interview';
  const selWords = selected ? selected.q.answer.split(/\s+/).length : 0;
  const problemObj = problems.find((p) => p.slug === (problemSel.slug || problems[0]?.slug));
  const problemVariant = problemObj?.variants.find((v) => v.slug === problemSel.part);
  const problemId = problemObj ? (problemVariant ? `problem:${problemObj.slug}/${problemVariant.slug}` : `problem:${problemObj.slug}`) : null;
  const problemWords = problemObj ? (problemVariant ? problemVariant.notes : problemObj.overview).split(/\s+/).length : 0;
  const dialogOpen = editor !== null || audioOpen || progressOpen || resourcesOpen;
  const trackId = !tracking || dialogOpen ? null : inQuestions ? selected?.q.id ?? null : problemId;
  useReadTracker({
    id: trackId,
    words: inQuestions ? selWords : problemWords,
    container: inQuestions ? readerRef : problemsReaderRef,
    enabled: progress.state.autoTrack,
    listening: inQuestions && player.status === 'playing' && player.index === selIndex,
    onRead: (id) => { if (progress.markRead(id, 'auto')) setToast({ id, text: 'Marked as read' }); },
  });
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);
  const toggleRead = (id: string, read: boolean) => {
    if (read) progress.markRead(id, 'manual');
    else progress.unmark(id);
    setToast(null);
  };
  const orderedQuestions = (t: Topic) => LEVELS.flatMap((l) => t.questions.filter((q) => q.level === l));
  const continueTopic = (t: Topic) => {
    const next = orderedQuestions(t).find((q) => !progress.isRead(q.id)) ?? orderedQuestions(t)[0];
    if (!next) return;
    setView({ kind: 'topic', slug: t.slug });
    setModuleFilter(''); setLevel(''); setSearch(''); setReadFilter('all');
    setSelectedId(next.id);
    setProgressOpen(false);
    setDrawer('');
  };

  // ---- lock screen / headset controls and sleep timer ----------------------------------------
  const mediaHandlers = useRef({ play: () => {}, pause: () => {}, prev: () => {}, next: () => {}, stop: () => {} });
  mediaHandlers.current = { play: () => player.play(), pause: player.pause, prev: () => step(-1), next: () => step(1), stop: player.stop };
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    if (player.status === 'idle') { ms.playbackState = 'none'; ms.metadata = null; return; }
    ms.metadata = new MediaMetadata({ title: readables[player.index]?.title ?? 'Interview Prep', artist: 'Interview Prep', album: title });
    ms.playbackState = player.status === 'playing' ? 'playing' : 'paused';
    const set = (a: MediaSessionAction, fn: () => void) => { try { ms.setActionHandler(a, fn); } catch { /* unsupported action */ } };
    set('play', () => mediaHandlers.current.play());
    set('pause', () => mediaHandlers.current.pause());
    set('previoustrack', () => mediaHandlers.current.prev());
    set('nexttrack', () => mediaHandlers.current.next());
    set('stop', () => mediaHandlers.current.stop());
  }, [player.status, player.index]); // eslint-disable-line react-hooks/exhaustive-deps
  const listening = player.status !== 'idle';
  useEffect(() => {
    if (!listening || !settings.sleepMinutes) return;
    const t = window.setTimeout(() => player.stop(), settings.sleepMinutes * 60_000);
    return () => window.clearTimeout(t);
  }, [listening, settings.sleepMinutes]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- keyboard shortcuts -----------------------------------------------------------------
  const keys = useRef<(e: KeyboardEvent) => void>(() => {});
  keys.current = (e) => {
    const t = e.target as HTMLElement;
    if (t.matches('input, textarea, select, [contenteditable]') || e.metaKey || e.ctrlKey || e.altKey || editor || view.kind === 'home' || view.kind === 'interview') return;
    if (e.key === ' ' && !t.matches('button, a')) {
      e.preventDefault();
      if (player.status === 'playing') player.pause();
      else player.play(player.status === 'paused' ? undefined : curIndex);
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
  const title = view.kind === 'home' ? 'Home' : view.kind === 'interview' ? 'Interview prep' : view.kind === 'set' ? studySets.sets.find((x) => x.id === view.id)?.name ?? 'Study set' : view.kind === 'problems' ? 'Problems' : view.kind === 'favorites' ? 'Favorites' : view.kind === 'all' ? 'All questions' : topics.find((t) => t.slug === view.slug)?.name ?? '';
  const go = (v: View) => { setView(v); setModuleFilter(''); setDrawer(''); };
  const isView = (v: View) => v.kind === view.kind && (v.kind !== 'topic' || (view.kind === 'topic' && v.slug === view.slug)) && (v.kind !== 'set' || (view.kind === 'set' && v.id === view.id));
  const nextTheme = () => setThemePref(themePref === 'system' ? (dark ? 'light' : 'dark') : themePref === 'dark' ? 'light' : 'dark');
  const openNotes = selected ? feedback.filter((f) => f.topic === selected.topic.slug && (f.question === selected.q.id || f.question === null) && f.status === 'open').length : 0;
  const activeFilters = (level ? 1 : 0) + (moduleFilter ? 1 : 0) + (groupBy === 'module' ? 1 : 0) + (tracking && readFilter !== 'all' ? 1 : 0);
  const openQuestion = (id: string) => {
    const t = topics.find((x) => x.questions.some((q) => q.id === id));
    if (!t) return;
    setView({ kind: 'topic', slug: t.slug });
    setModuleFilter('');
    setLevel('');
    setSearch('');
    setSelectedId(id);
  };
  const pageView = view.kind === 'home' || view.kind === 'interview'; // full-width pages without a question list
  const showSide = layout.sidebar || view.kind === 'problems' || pageView;
  const showList = !pageView && (layout.list !== 'hidden' || view.kind === 'problems');
  const panesColumns = pageView ? [showSide ? '250px' : '', 'minmax(0, 1fr)'].filter(Boolean).join(' ') : [showSide ? '250px' : '', ...(layout.list === 'right' ? ['minmax(0, 1fr)', showList ? '360px' : ''] : [showList ? '360px' : '', 'minmax(0, 1fr)'])].filter(Boolean).join(' ');
  // Phones and tablets: swipe right for the topics menu, swipe left for the question list (and swipe back to close).
  // Wide screens: the edge tabs show or hide the same panels.
  const onTouchStart = (e: React.TouchEvent) => { touch.current = (e.target as HTMLElement).closest('pre, table, svg, input, textarea, [data-noswipe]') ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = touch.current; touch.current = null;
    if (!t || !narrow) return;
    const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
    if (drawer === 'topics') { if (dx < 0) setDrawer(''); }
    else if (drawer === 'list') { if (dx > 0) setDrawer(''); }
    else if (dx > 0) setDrawer('topics');
    else setDrawer('list');
  };
  const toggleSide = () => (narrow ? setDrawer(drawer === 'topics' ? '' : 'topics') : setLayout({ ...layout, sidebar: !layout.sidebar }));
  const toggleList = () => {
    if (narrow) return setDrawer(drawer === 'list' ? '' : 'list');
    if (layout.list !== 'hidden') { lastListSide.current = layout.list; setLayout({ ...layout, list: 'hidden' }); }
    else setLayout({ ...layout, list: lastListSide.current });
  };
  useEffect(() => {
    if (layout.list === 'hidden') return;
    lastListSide.current = layout.list;
    try { localStorage.setItem('ip.listSide', layout.list); } catch { /* ignore */ }
  }, [layout.list]);
  useEffect(() => {
    const root = readerRef.current;
    if (!root || view.kind === 'problems' || view.kind === 'home' || view.kind === 'interview') return;
    setFullHeadVisible(true);
    setPagerVisible(false);
    const actions = root.querySelector('.actions');
    const pager = root.querySelector('.pager');
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === actions) setFullHeadVisible(e.isIntersecting);
        if (e.target === pager) setPagerVisible(e.isIntersecting);
      }
    }, { root, threshold: 0 });
    if (actions) obs.observe(actions);
    if (pager) obs.observe(pager);
    return () => obs.disconnect();
  }, [selected?.q.id, view.kind]);
  const miniHead = !fullHeadVisible;
  // where the tabs sit on wide screens: on the edge of the panel they control
  const sideW = showSide ? 250 : 0;
  // a hidden list keeps its side, so its arrow stays on the edge where it will reappear
  const listSide = layout.list === 'hidden' ? lastListSide.current : layout.list;
  const listOnRight = listSide === 'right';
  const listShown = layout.list !== 'hidden';
  const leftTabStyle: React.CSSProperties = narrow ? {} : { left: sideW };
  const listTabLeft = !narrow && !listOnRight; // the list sits next to the topics menu
  const listTabStyle: React.CSSProperties = narrow ? {} : listTabLeft ? { left: sideW + (listShown ? 360 : 0), top: 'calc(45% + 64px)' } : { right: listShown ? 360 : 0 };
  const playingId = player.status === 'playing' ? items[player.index]?.q.id : undefined;

  return (
    <div className="app">
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className={'panes' + (layout.list === 'right' ? ' l-right' : layout.list === 'hidden' ? ' l-hidden' : '') + (!layout.sidebar && view.kind !== 'problems' && !pageView ? ' no-side' : '') + (pageView ? ' page-view' : '')} style={{ '--cols': panesColumns } as React.CSSProperties}>
        {drawer && <div className="backdrop" onClick={() => setDrawer('')} />}

        <nav className={'sidebar' + (drawer === 'topics' ? ' open' : '')} aria-label="Topics">
          <div className="brand"><HeadphonesIcon /> Interview Prep</div>
          <div className="sidebar-scroll">
          <div className="nav-group">
            <button className={'nav' + (isView({ kind: 'home' }) ? ' active' : '')} onClick={() => go({ kind: 'home' })}>Home</button>
            {features.interviewPrep && <button className={'nav' + (isView({ kind: 'interview' }) ? ' active' : '')} onClick={() => go({ kind: 'interview' })}>Interview prep</button>}
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
          {features.studySets && studySets.sets.length > 0 && (
            <>
              <div className="nav-title">Study sets</div>
              <div className="nav-group">
                {studySets.sets.map((x) => (
                  <button key={x.id} className={'nav' + (isView({ kind: 'set', id: x.id }) ? ' active' : '')} onClick={() => go({ kind: 'set', id: x.id })}>
                    <span className="nav-line"><span>{x.name}</span><span className="count">{x.ids.length}</span></span>
                  </button>
                ))}
              </div>
            </>
          )}
          {(() => {
            const names = groupTopics(topics, groupOrder).map((g) => g.name);
            const allClosed = names.length > 0 && names.every((n) => collapsedGroups.includes(n));
            return (
              <div className="nav-title nav-title-row">
                <span>Topics</span>
                <button className="link-btn" onClick={() => setCollapsedGroups(allClosed ? [] : names)} aria-label={allClosed ? 'Expand all topic groups' : 'Collapse all topic groups'}>
                  {allClosed ? 'Expand all' : 'Collapse all'}
                </button>
              </div>
            );
          })()}
          {groupTopics(topics, groupOrder).map((g) => {
            const activeHere = view.kind === 'topic' && g.topics.some((t) => t.slug === view.slug);
            const open = activeHere || !collapsedGroups.includes(g.name);
            return (
              <div key={g.name} className="topic-group">
                <button className="group-head" onClick={() => setCollapsedGroups(open && !activeHere ? [...collapsedGroups, g.name] : collapsedGroups.filter((x) => x !== g.name))} aria-expanded={open}>
                  <span className={'chev' + (open ? '' : ' closed')}><DownIcon /></span>
                  <span className="group-name">{g.name}</span>
                  <span className="count">{g.topics.length}</span>
                </button>
                {open && (
                  <div className="nav-group">
                    {g.topics.map((t) => (
                      <button key={t.slug} className={'nav has-bar' + (isView({ kind: 'topic', slug: t.slug }) ? ' active' : '')} onClick={() => go({ kind: 'topic', slug: t.slug })}>
                        <span className="nav-line"><span>{t.name}</span><span className="count">{tracking ? `${progress.readCount(t.questions.map((q) => q.id))}/${t.questions.length}` : t.questions.length}</span></span>
                        {tracking && <span className="nav-bar"><i style={{ width: t.questions.length ? `${(progress.readCount(t.questions.map((q) => q.id)) / t.questions.length) * 100}%` : 0 }} /></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          </div>
          <div className="sidebar-foot">
            {features.newTopic && <button className="btn" onClick={newTopic}><PlusIcon /> New topic</button>}
            <span className="foot-icons">
              <button className="icon-btn" onClick={() => setViewOpen(true)} aria-label="View options" title="Layout and what to show"><LayoutIcon /></button>
              {tracking && <button className="icon-btn" onClick={() => setProgressOpen(true)} aria-label="My progress" title="My progress"><ProgressIcon /></button>}
              <button className="icon-btn" onClick={() => setAudioOpen(true)} aria-label="Audio settings" title="Audio settings"><SettingsIcon /></button>
              <button className="icon-btn" onClick={nextTheme} aria-label="Toggle theme" title={`Theme: ${themePref}`}>{dark ? <SunIcon /> : <MoonIcon />}</button>
            </span>
          </div>
        </nav>

        {view.kind === 'home' ? (
          <Dashboard
            topics={topics}
            problems={problems}
            sets={features.studySets ? studySets.sets : []}
            interviewPrep={features.interviewPrep}
            tracking={tracking}
            isRead={progress.isRead}
            favCount={favCount}
            lastId={selectedId}
            onGo={go}
            onOpenQuestion={(id) => { openQuestion(id); setDrawer(''); }}
            onListenQuestion={(id) => { openQuestion(id); setPendingPlay(id); setDrawer(''); }}
            onRenameSet={studySets.rename}
            onRemoveSet={studySets.remove}
          />
        ) : view.kind === 'interview' ? (
          <InterviewView
            topics={topics}
            onOpenQuestion={(id) => { openQuestion(id); setDrawer(''); }}
            onCreateSet={studySets.add}
            onOpenSet={(id) => go({ kind: 'set', id })}
            sets={studySets.sets}
            onUpdateSet={studySets.update}
          />
        ) : view.kind === 'problems' ? (
          <Problems
            problems={problems}
            resources={resources}
            topics={topics}
            slug={problemSel.slug || problems[0]?.slug || ''}
            part={problemSel.part}
            language={codeLang}
            dark={dark}
            drawer={drawer === 'list'}
            readerRef={problemsReaderRef}
            onListen={() => player.play(problemIndex)}
            onPlayBlock={(b) => player.play(problemIndex, b)}
            activeBlock={player.status !== 'idle' && player.index === problemIndex && player.now?.part === 'answer' ? player.now.block ?? null : null}
            tracking={tracking}
            isRead={progress.isRead}
            onToggleRead={toggleRead}
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
                {view.kind === 'topic' && (
                  <button className="icon-btn" onClick={() => setResourcesOpen(true)} aria-label="Resources" title="Resources: docs and tutorials"><BookIcon /></button>
                )}
                {view.kind === 'set' && <button className="icon-btn" onClick={() => { if (window.confirm(`Delete the study set "${title}"? The questions stay in the bank.`)) { studySets.remove(view.id); setView({ kind: 'home' }); } }} aria-label="Delete this study set" title="Delete this study set"><TrashIcon /></button>}
                {items.length > 0 && <button className="icon-btn" onClick={() => player.play(0)} aria-label="Play all in this list" title="Play all in this list, from the top"><PlayIcon /></button>}
                {features.editQuestions && <button className="icon-btn" onClick={() => setEditor({ topicSlug: view.kind === 'topic' ? view.slug : topics[0]?.slug ?? '' })} aria-label="Add question" title="Add question"><PlusIcon /></button>}
                <button className="icon-btn mobile-only" onClick={() => setDrawer('')} aria-label="Close"><CloseIcon /></button>
              </span>
            </div>
            {view.kind === 'set' && (
              <div className="set-actions">
                <button className="btn small" onClick={() => go({ kind: 'interview' })}>View analysis</button>
                <button className="btn small danger" onClick={() => { if (window.confirm(`Delete the study set "${title}"? The questions stay in the bank.`)) { studySets.remove(view.id); setView({ kind: 'home' }); } }}><TrashIcon /> Delete set</button>
              </div>
            )}
            {tracking && view.kind === 'topic' && (() => {
              const t = topics.find((x) => x.slug === view.slug);
              if (!t) return null;
              const done = progress.readCount(t.questions.map((q) => q.id));
              return (
                <div className="list-progress">
                  <span>{done} of {t.questions.length} read</span>
                  {done < t.questions.length && <button className="link-btn" onClick={() => continueTopic(t)}>Continue</button>}
                </div>
              );
            })()}
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
                <Select label="Filter by module" value={moduleFilter} onChange={setModuleFilter} options={[{ value: '', label: 'All modules' }, ...modules.map((m) => ({ value: m, label: m }))]} />
              )}
            </div>
            {tracking && <div className="segmented" role="group" aria-label="Show">
              <span>Show</span>
              {(['all', 'unread', 'read'] as const).map((f) => <button key={f} className={readFilter === f ? 'active' : ''} onClick={() => setReadFilter(f)}>{f === 'all' ? 'All' : f === 'unread' ? 'Unread' : 'Read'}</button>)}
            </div>}
            <div className="chips" role="group" aria-label="Level">
              {(['', ...LEVELS] as const).map((l) => (
                <button key={l || 'all'} className={'chip' + (level === l ? ' active' : '')} onClick={() => setLevel(l)}>{l || 'All'}</button>
              ))}
            </div>
            {activeFilters > 0 && <button className="link-btn" onClick={() => { setLevel(''); setModuleFilter(''); setGroupBy('level'); setReadFilter('all'); }}>Clear filters</button>}
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
                  {tracking && progress.isRead(it.q.id) && <span className="qdone" aria-label="Read"><CheckIcon />{progress.state.counts && progress.timesRead(it.q.id) > 1 && <span className="qtimes">{progress.timesRead(it.q.id)}×</span>}</span>}
                </button>
                <button className="qplay" onClick={() => { player.play(i); setDrawer(''); }} aria-label={`Play question ${it.number}`} title="Play from this question"><PlayIcon /></button>
              </li>
              </Fragment>
            ))}
            {!items.length && <li className="empty">{loadError || (topics.length ? 'No questions match.' : 'Loading…')}</li>}
          </ol>
        </section>

        <main className="reader" ref={readerRef}>
          <ReadRail container={readerRef} contentKey={selected?.q.id ?? ''} />
          {selected ? (
            <article key={selected.q.id}>
              <div className="mini-head-wrap">
                <div className={'mini-head' + (miniHead ? ' show' : '')} aria-hidden={!miniHead}>
                  <button className="mini-title" tabIndex={miniHead ? 0 : -1} onClick={() => readerRef.current?.scrollTo({ top: 0 })} title="Back to the top">
                    <UpIcon /><span className="muted">#{selected.number}</span><span className="mini-q"><Inline text={selected.q.question} /></span>
                  </button>
                  <button className="icon-btn" tabIndex={miniHead ? 0 : -1} onClick={() => player.play(selIndex)} aria-label="Listen" title="Listen"><PlayIcon /></button>
                  <button className={'icon-btn' + (selected.q.favorite ? ' on-fav' : '')} tabIndex={miniHead ? 0 : -1} onClick={() => toggleFav(selected)} aria-label="Favorite" title="Favorite"><StarIcon filled={selected.q.favorite} /></button>
                  {tracking && <button className={'icon-btn' + (progress.isRead(selected.q.id) ? ' on-read' : '')} tabIndex={miniHead ? 0 : -1} onClick={() => toggleRead(selected.q.id, !progress.isRead(selected.q.id))} aria-label="Mark as read" title="Mark as read"><CheckIcon /></button>}
                </div>
              </div>
              <div className="crumbs">
                <span>{selected.topic.name}</span>
                {selected.q.module && <button className="crumb-module" onClick={() => { setGroupBy('module'); setModuleFilter(selected.q.module ?? ''); }} title="Show only this module">{selected.q.module}</button>}
                <span className={'badge ' + selected.q.level}>{selected.q.level}</span>
                <span className="muted">#{selected.number}</span>
              </div>
              <h1><Inline text={selected.q.question} /></h1>
              {tracking && progress.state.counts && progress.timesRead(selected.q.id) >= 3 && (
                <p className="revisit">You have read this {progress.timesRead(selected.q.id)} times. A quick read of the short answer may be enough{selected.q.favorite ? '.' : ', or star it as a favorite to find it later.'}</p>
              )}
              <div className="actions">
                <button className="btn primary" onClick={() => player.play(selIndex)}><PlayIcon /> Listen</button>
                <button className={'btn' + (selected.q.favorite ? ' fav' : '')} onClick={() => toggleFav(selected)} aria-pressed={selected.q.favorite}>
                  <StarIcon filled={selected.q.favorite} /> {selected.q.favorite ? 'Favorite' : 'Favorite'}
                </button>
                {tracking && <button className={'btn' + (progress.isRead(selected.q.id) ? ' done' : '')} onClick={() => toggleRead(selected.q.id, !progress.isRead(selected.q.id))} aria-pressed={progress.isRead(selected.q.id)}>
                  <CheckIcon /> {progress.isRead(selected.q.id) ? 'Read' : 'Mark as read'}
                </button>}
                {features.editQuestions && <button className="btn" onClick={() => setEditor({ topicSlug: selected.topic.slug, question: selected.q })}><EditIcon /> Edit</button>}
                <button className="btn desktop-only" onClick={() => setViewOpen(true)} title="Layout and what to show"><LayoutIcon /> Layout</button>
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
              {(() => {
                const all = resources[selected.topic.slug] ?? [];
                const near = all.filter((r) => r.module && r.module === selected.q.module).slice(0, 4);
                return all.length ? <FurtherReading items={near.length ? near : all.filter((r) => r.type === 'official-docs').slice(0, 2)} onAll={() => { setView({ kind: 'topic', slug: selected.topic.slug }); setResourcesOpen(true); }} /> : null;
              })()}
              {selected.q.tags.length > 0 && (
                <div className="tags">{selected.q.tags.map((t) => <button key={t} className="tag" onClick={() => setSearch(t)}>#{t}</button>)}</div>
              )}
              <div className="mini-foot-wrap">
                <div className={'mini-foot' + (pagerVisible ? ' hide' : '')} aria-hidden={pagerVisible}>
                  <button className="icon-btn" tabIndex={pagerVisible ? -1 : 0} onClick={() => step(-1)} disabled={selIndex === 0} aria-label="Previous question" title="Previous"><PrevIcon /></button>
                  <span className="muted">{selIndex + 1} / {items.length}</span>
                  <button className="icon-btn" tabIndex={pagerVisible ? -1 : 0} onClick={() => step(1)} disabled={selIndex >= items.length - 1} aria-label="Next question" title="Next"><NextIcon /></button>
                </div>
              </div>
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

      {!drawer && !dialogOpen && (
        <>
          {(narrow || (view.kind !== 'problems' && !pageView)) && <button className="edge-tab left" style={leftTabStyle} onClick={toggleSide} aria-label="Show or hide the topics menu" title="Topics menu (swipe right)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={!narrow && showSide ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} /></svg>
          </button>}
          {view.kind !== 'problems' && !pageView && (
            <button className={'edge-tab ' + (listTabLeft ? 'left' : 'right')} style={listTabStyle} onClick={toggleList} aria-label="Show or hide the question list" title="Questions (swipe left)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={(listTabLeft ? listShown : !listShown) && !narrow ? 'm15 6-6 6 6 6' : narrow ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} /></svg>
            </button>
          )}
        </>
      )}

      {player.status !== 'idle' && (
        <PlayerBar
          status={player.status}
          position={player.index + 1}
          total={readables.length}
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

      {resourcesOpen && view.kind === 'topic' && (
        <ResourcesDialog
          title={topics.find((t) => t.slug === view.slug)?.name ?? ''}
          items={resources[view.slug] ?? []}
          onAdd={!features.resourceEditing ? undefined : (r) => addResource(view.slug, r)}
          onRemove={!features.resourceEditing ? undefined : (url) => removeResource(view.slug, url)}
          onClose={() => setResourcesOpen(false)}
        />
      )}

      {tracking && progressOpen && (
        <ProgressDialog
          topics={topics}
          read={progress.state.read}
          autoTrack={progress.state.autoTrack}
          onAutoTrack={progress.setAutoTrack}
          counts={!!progress.state.counts}
          onCounts={progress.setCounts}
          onResetCounts={progress.resetCounts}
          onClearModule={(t, m) => progress.clear(t.questions.filter((q) => (q.module ?? 'Other') === m).map((q) => q.id))}
          onContinue={continueTopic}
          onClearTopic={(t) => progress.clear(t.questions.map((q) => q.id))}
          onClearAll={() => progress.clear()}
          onClose={() => setProgressOpen(false)}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <CheckIcon /> {toast.text}
          <button className="link-btn" onClick={() => { progress.unmark(toast.id); setToast(null); }}>Undo</button>
        </div>
      )}

      {newTopicOpen && <NewTopicDialog groups={groupOrder} onCreate={createTopicIn} onClose={() => setNewTopicOpen(false)} />}
      {viewOpen && <ViewDialog groupOrder={groupOrder} topics={allTopics} layout={layout} hidden={hidden} onLayout={setLayout} onHidden={setHidden} tracking={tracking} onTracking={setTracking} onClose={() => setViewOpen(false)} />}

      {audioOpen && (
        <AudioSettings settings={settings} piper={piper} engine={speakOptions().engine} onSettings={setSettings} onBeforeSample={player.pause} onClose={() => setAudioOpen(false)} />
      )}

      {editor && <Editor topics={allTopics} topicSlug={editor.topicSlug} question={editor.question} dark={dark} onSave={save} onDelete={editor.question ? () => { const it = items.find((x) => x.q.id === editor.question?.id); setEditor(null); if (it) void remove(it); } : undefined} onClose={() => setEditor(null)} />}
    </div>
  );
}
