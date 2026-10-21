import { useMemo, useSyncExternalStore } from 'react';
import type { StudySet } from './types';

/** Study sets live in this browser. Same idea as progress: a tiny store you can later back with a server. */
const KEY = 'ip.sets.v1';

function load(): StudySet[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

let sets: StudySet[] = load();
const listeners = new Set<() => void>();
const commit = (next: StudySet[]) => {
  sets = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage blocked: sets last for this session */ }
  listeners.forEach((l) => l());
};
const subscribe = (fn: () => void) => { listeners.add(fn); return () => void listeners.delete(fn); };
if (typeof window !== 'undefined') window.addEventListener('storage', (e) => { if (e.key === KEY) { sets = load(); listeners.forEach((l) => l()); } });

export function useStudySets() {
  const list = useSyncExternalStore(subscribe, () => sets);
  return useMemo(() => ({
    sets: list,
    add: (name: string, ids: string[], note?: string): StudySet => {
      const set: StudySet = { id: `set-${Date.now().toString(36)}`, name: name.trim() || 'Study set', createdAt: Date.now(), ids, note };
      commit([set, ...sets]);
      return set;
    },
    rename: (id: string, name: string) => commit(sets.map((s) => (s.id === id ? { ...s, name: name.trim() || s.name } : s))),
    remove: (id: string) => commit(sets.filter((s) => s.id !== id)),
  }), [list]);
}
