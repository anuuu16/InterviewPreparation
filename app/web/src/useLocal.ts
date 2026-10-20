import { useEffect, useState } from 'react';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** useState that persists to localStorage (safe when storage is blocked). */
export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initial;
      const saved = JSON.parse(raw);
      // merge objects so newly added settings get their defaults
      return isObject(initial) && isObject(saved) ? ({ ...initial, ...saved } as T) : (saved as T);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
