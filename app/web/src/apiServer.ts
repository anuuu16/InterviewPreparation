import type { FeedbackEntry, Problem, Question, Resource, Topic } from './types';

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
export const createTopic = (name: string, group?: string) => call<{ slug: string; name: string }>('/topics', 'POST', { name, group });
export const getGroups = () => call<string[]>('/groups');
export const addQuestion = (slug: string, q: Partial<Question>) => call<Question>(`/topics/${slug}/questions`, 'POST', q);
export const updateQuestion = (slug: string, id: string, q: Partial<Question>) =>
  call<Question>(`/topics/${slug}/questions/${id}`, 'PUT', q);
export const deleteQuestion = (slug: string, id: string) => call<{ ok: boolean }>(`/topics/${slug}/questions/${id}`, 'DELETE');

export const getFeedback = () => call<FeedbackEntry[]>('/feedback');
export const addFeedback = (e: Pick<FeedbackEntry, 'topic' | 'question' | 'kind' | 'text'> & { type?: string }) => call<FeedbackEntry>('/feedback', 'POST', e);
export const updateFeedback = (id: string, patch: { text?: string; status?: 'open' | 'resolved' }) => call<FeedbackEntry>(`/feedback/${id}`, 'PUT', patch);
export const deleteFeedback = (id: string) => call<{ ok: boolean }>(`/feedback/${id}`, 'DELETE');

export const getProblems = () => call<Problem[]>('/problems');

export const getResources = () => call<Record<string, Resource[]>>('/resources');
export const addResource = (key: string, r: Resource) => call<Resource>(`/resources/${key}`, 'POST', r);
export const removeResource = (key: string, url: string) => call<{ ok: boolean }>(`/resources/${key}/remove`, 'PUT', { url });
