import type { Question, Topic } from './types';

async function call<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data as T;
}

export const getAll = () => call<Topic[]>('/all');
export const createTopic = (name: string) => call<{ slug: string; name: string }>('/topics', 'POST', { name });
export const addQuestion = (slug: string, q: Partial<Question>) => call<Question>(`/topics/${slug}/questions`, 'POST', q);
export const updateQuestion = (slug: string, id: string, q: Partial<Question>) =>
  call<Question>(`/topics/${slug}/questions/${id}`, 'PUT', q);
export const deleteQuestion = (slug: string, id: string) => call<{ ok: boolean }>(`/topics/${slug}/questions/${id}`, 'DELETE');
