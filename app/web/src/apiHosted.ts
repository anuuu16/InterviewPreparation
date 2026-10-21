import type { FeedbackEntry, Problem, Question, Resource, Topic } from './types';

/**
 * Hosted (static) mode. The question bank, problems and resources are JSON files built from git.
 * Everything you change on the hosted site (favorites, edits, new questions, notes, feedback) is an "overlay"
 * kept in this browser and, when the site has the /api/overlay function (Cloudflare Pages + KV), synced there
 * so it follows you between devices. Merge anything you want to keep into data/*.json yourself.
 */
interface Overlay {
  favorites: Record<string, boolean>;
  edits: Record<string, Partial<Question>>;
  deleted: string[];
  added: Record<string, Question[]>;
  topics: { slug: string; name: string; group?: string }[];
  feedback: FeedbackEntry[];
  resources: Record<string, Resource[]>;
  removed: Record<string, string[]>;
  updatedAt: number;
}
const EMPTY: Overlay = { favorites: {}, edits: {}, deleted: [], added: {}, topics: [], feedback: [], resources: {}, removed: {}, updatedAt: 0 };
const KEY = 'ip.overlay.v1';
const TOKEN = 'ip.editToken';
const LEVELS = ['basic', 'intermediate', 'advanced'];

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

let overlay: Overlay = (() => { try { return { ...EMPTY, ...JSON.parse(store.get(KEY) ?? '{}') }; } catch { return { ...EMPTY }; } })();
let remote: 'unknown' | 'on' | 'off' = 'unknown';
let loaded: Promise<void> | null = null;
let timer = 0;

const headers = () => ({ 'Content-Type': 'application/json', 'x-edit-token': store.get(TOKEN) ?? '' });

/** Pull the synced overlay once. 404 means a plain static host: stay local. 401 asks for the edit token. */
function sync(): Promise<void> {
  loaded ??= (async () => {
    try {
      let res = await fetch('/api/overlay', { headers: headers() });
      if (res.status === 401) {
        const t = window.prompt('This site is protected. Enter your edit token (leave empty to work offline):');
        if (t) { store.set(TOKEN, t.trim()); res = await fetch('/api/overlay', { headers: headers() }); }
      }
      if (!res.ok) { remote = 'off'; return; }
      remote = 'on';
      const data = (await res.json()) as Overlay | null;
      // the newer side wins, so a first visit on a new device picks up your changes and an offline edit is not lost
      if (data && (data.updatedAt ?? 0) > overlay.updatedAt) { overlay = { ...EMPTY, ...data }; store.set(KEY, JSON.stringify(overlay)); }
      else if (overlay.updatedAt > (data?.updatedAt ?? 0)) push();
    } catch { remote = 'off'; }
  })();
  return loaded;
}
function push() {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => { void fetch('/api/overlay', { method: 'PUT', headers: headers(), body: JSON.stringify(overlay) }).catch(() => {}); }, 600);
}
function commit(next: Overlay) {
  overlay = { ...next, updatedAt: Date.now() };
  store.set(KEY, JSON.stringify(overlay));
  if (remote !== 'off') push();
}

let base: Promise<Topic[]> | null = null;
const baseTopics = () => (base ??= fetch('/static/all.json').then((r) => { if (!r.ok) throw new Error('Could not load the question bank'); return r.json() as Promise<Topic[]> }));

const apply = (q: Question): Question => {
  const e = overlay.edits[q.id];
  const fav = overlay.favorites[q.id];
  return { ...q, ...e, ...(fav === undefined ? {} : { favorite: fav }) };
};

async function merged(): Promise<Topic[]> {
  await sync();
  const baseList = await baseTopics();
  const dead = new Set(overlay.deleted);
  const known = new Set(baseList.map((t) => t.slug));
  const all = [...baseList, ...overlay.topics.filter((t) => !known.has(t.slug)).map((t) => ({ ...t, questions: [] as Question[] }))];
  return all.map((t) => ({ ...t, questions: [...t.questions, ...(overlay.added[t.slug] ?? [])].filter((q) => !dead.has(q.id)).map(apply) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

function clean(body: Partial<Question>, q: Partial<Question>): Partial<Question> {
  const out = { ...q };
  if (typeof body.question === 'string') out.question = body.question.trim();
  if (typeof body.answer === 'string') out.answer = body.answer.trim();
  if (body.level && LEVELS.includes(body.level)) out.level = body.level;
  if (typeof body.module === 'string') { const m = body.module.trim(); if (m) out.module = m; else delete out.module; }
  if (Array.isArray(body.tags)) out.tags = body.tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof body.favorite === 'boolean') out.favorite = body.favorite;
  return out;
}

export const getAll = () => merged();
export const getGroups = async () => (await fetch('/static/groups.json')).json() as Promise<string[]>;
export const getProblems = async () => (await fetch('/static/problems.json')).json() as Promise<Problem[]>;

export async function createTopic(name: string, group?: string) {
  await sync();
  const slug = slugify(name);
  if (!slug) throw new Error('Name required');
  if ((await merged()).some((t) => t.slug === slug)) throw new Error('Topic exists');
  commit({ ...overlay, topics: [...overlay.topics, { slug, name, ...(group ? { group } : {}) }] });
  return { slug, name };
}

export async function addQuestion(slug: string, body: Partial<Question>) {
  const q = clean(body, { id: uid(), question: '', answer: '', level: 'basic', tags: [], favorite: false }) as Question;
  if (!q.question) throw new Error('Question required');
  commit({ ...overlay, added: { ...overlay.added, [slug]: [...(overlay.added[slug] ?? []), q] } });
  return q;
}

export async function updateQuestion(slug: string, id: string, body: Partial<Question>) {
  const own = overlay.added[slug]?.find((q) => q.id === id);
  if (own) {
    const next = clean(body, own) as Question;
    commit({ ...overlay, added: { ...overlay.added, [slug]: overlay.added[slug].map((q) => (q.id === id ? next : q)) } });
    return next;
  }
  const onlyFav = Object.keys(body).length === 1 && typeof body.favorite === 'boolean';
  if (onlyFav) commit({ ...overlay, favorites: { ...overlay.favorites, [id]: !!body.favorite } });
  else commit({ ...overlay, edits: { ...overlay.edits, [id]: clean(body, overlay.edits[id] ?? {}) } });
  const hit = (await merged()).flatMap((t) => t.questions).find((q) => q.id === id);
  if (!hit) throw new Error('Not found');
  return hit;
}

export async function deleteQuestion(slug: string, id: string) {
  const mine = overlay.added[slug]?.some((q) => q.id === id);
  commit({ ...overlay, deleted: mine ? overlay.deleted : [...overlay.deleted, id], added: mine ? { ...overlay.added, [slug]: overlay.added[slug].filter((q) => q.id !== id) } : overlay.added });
  return { ok: true };
}

export async function getFeedback() { await sync(); return overlay.feedback; }
export async function addFeedback(e: Pick<FeedbackEntry, 'topic' | 'question' | 'kind' | 'text'> & { type?: string }) {
  const text = e.text.trim();
  if (!text) throw new Error('Text required');
  const entry = {
    id: `fb-${Date.now().toString(36)}${Math.random().toString(16).slice(2, 6)}`,
    topic: e.topic, question: e.question ?? null, kind: e.kind, ...(e.kind === 'feedback' ? { type: e.type ?? 'other' } : {}),
    text, status: 'open', createdAt: new Date().toISOString(),
  } as FeedbackEntry;
  commit({ ...overlay, feedback: [...overlay.feedback, entry] });
  return entry;
}
export async function updateFeedback(id: string, patch: { text?: string; status?: 'open' | 'resolved' }) {
  let out: FeedbackEntry | undefined;
  const feedback = overlay.feedback.map((f) => {
    if (f.id !== id) return f;
    out = { ...f, ...(patch.text?.trim() ? { text: patch.text.trim() } : {}), ...(patch.status ? { status: patch.status, resolvedAt: patch.status === 'resolved' ? new Date().toISOString() : undefined } : {}) };
    return out;
  });
  if (!out) throw new Error('Not found');
  commit({ ...overlay, feedback });
  return out;
}
export async function deleteFeedback(id: string) {
  commit({ ...overlay, feedback: overlay.feedback.filter((f) => f.id !== id) });
  return { ok: true };
}

export async function getResources() {
  await sync();
  const res = (await (await fetch('/static/resources.json')).json()) as Record<string, Resource[]>;
  const keys = new Set([...Object.keys(res), ...Object.keys(overlay.resources)]);
  const out: Record<string, Resource[]> = {};
  keys.forEach((k) => { out[k] = [...(res[k] ?? []), ...(overlay.resources[k] ?? [])].filter((r) => !(overlay.removed[k] ?? []).includes(r.url)); });
  return out;
}
export async function addResource(key: string, r: Resource) {
  commit({ ...overlay, resources: { ...overlay.resources, [key]: [...(overlay.resources[key] ?? []), r] } });
  return r;
}
export async function removeResource(key: string, url: string) {
  commit({ ...overlay, resources: { ...overlay.resources, [key]: (overlay.resources[key] ?? []).filter((r) => r.url !== url) }, removed: { ...overlay.removed, [key]: [...(overlay.removed[key] ?? []), url] } });
  return { ok: true };
}
