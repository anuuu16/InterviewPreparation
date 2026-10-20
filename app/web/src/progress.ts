import { useMemo, useSyncExternalStore } from 'react';

/**
 * Reading progress, kept in the browser. The store talks to a ProgressStorage adapter, so moving progress
 * to the server later means writing one more adapter; nothing else in the app changes.
 */
export type ReadSource = 'auto' | 'manual' | 'audio';

export interface ReadEntry {
  at: number | null; // when it was marked read; null = the user explicitly marked it unread
  source: ReadSource;
  locked?: boolean; // the user un-marked it: automatic tracking must not mark it again
}

export interface ProgressState {
  version: 1;
  autoTrack: boolean;
  read: Record<string, ReadEntry>; // key: question id, or "problem:<slug>[/<approach>]"
}

export interface ProgressStorage {
  load(): ProgressState | null;
  save(state: ProgressState): void;
  /** Called when another tab (or the server) changed the data. Returns an unsubscribe function. */
  subscribe?(onChange: () => void): () => void;
}

const KEY = 'ip.progress.v1';
const EMPTY: ProgressState = { version: 1, autoTrack: true, read: {} };

/** localStorage, with an in-memory fallback if the browser blocks storage. */
export const localStorageProgress: ProgressStorage = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      return s && s.version === 1 && typeof s.read === 'object' ? { ...EMPTY, ...s } : null;
    } catch {
      return null;
    }
  },
  save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage blocked or full: progress still works for this session */
    }
  },
  subscribe(onChange) {
    const on = (e: StorageEvent) => e.key === KEY && onChange();
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  },
};

export class ProgressStore {
  private state: ProgressState;
  private listeners = new Set<() => void>();

  constructor(private storage: ProgressStorage) {
    this.state = storage.load() ?? EMPTY;
    storage.subscribe?.(() => {
      this.state = storage.load() ?? EMPTY;
      this.emit();
    });
  }

  getState = () => this.state;

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => void this.listeners.delete(fn);
  };

  private set(next: ProgressState) {
    this.state = next;
    this.storage.save(next);
    this.emit();
  }
  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  isRead = (id: string) => !!this.state.read[id]?.at;

  /** Mark as read. Automatic sources never override an explicit "unread" from the user. Returns whether anything changed. */
  markRead(id: string, source: ReadSource): boolean {
    const cur = this.state.read[id];
    if (cur?.at) return false;
    if (cur?.locked && source !== 'manual') return false;
    this.set({ ...this.state, read: { ...this.state.read, [id]: { at: Date.now(), source } } });
    return true;
  }

  /** The user says "not read": remember that so automatic tracking leaves it alone. */
  unmark(id: string) {
    this.set({ ...this.state, read: { ...this.state.read, [id]: { at: null, source: 'manual', locked: true } } });
  }

  /** Forget progress (and un-marks) for the given ids, or everything when no ids are given. */
  clear(ids?: string[]) {
    if (!ids) return this.set({ ...this.state, read: {} });
    const read = { ...this.state.read };
    ids.forEach((id) => delete read[id]);
    this.set({ ...this.state, read });
  }

  setAutoTrack(autoTrack: boolean) {
    this.set({ ...this.state, autoTrack });
  }
}

export const progressStore = new ProgressStore(localStorageProgress);

export function useProgress() {
  const state = useSyncExternalStore(progressStore.subscribe, progressStore.getState);
  return useMemo(
    () => ({
      state,
      isRead: (id: string) => !!state.read[id]?.at,
      readCount: (ids: string[]) => ids.reduce((n, id) => n + (state.read[id]?.at ? 1 : 0), 0),
      markRead: progressStore.markRead.bind(progressStore),
      unmark: progressStore.unmark.bind(progressStore),
      clear: progressStore.clear.bind(progressStore),
      setAutoTrack: progressStore.setAutoTrack.bind(progressStore),
    }),
    [state],
  );
}
