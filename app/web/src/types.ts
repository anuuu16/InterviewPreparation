export type Level = 'basic' | 'intermediate' | 'advanced';
export const LEVELS: Level[] = ['basic', 'intermediate', 'advanced'];

export interface Question {
  id: string;
  question: string;
  answer: string;
  level: Level;
  module?: string;
  tags: string[];
  favorite: boolean;
}

export interface Topic {
  slug: string;
  name: string;
  questions: Question[];
}

/** A question as shown in the list, with where it came from and its display number. */
export interface Item {
  q: Question;
  topic: Topic;
  number: number;
}

export type View = { kind: 'topic'; slug: string } | { kind: 'favorites' } | { kind: 'all' };

export type FeedbackType = 'more-detail' | 'code-issue' | 'incorrect' | 'unclear' | 'missing' | 'other';

/** A personal note, or feedback for the author/agent, on a question (or a whole topic when `question` is null). */
export interface FeedbackEntry {
  id: string;
  topic: string; // topic slug
  question: string | null; // question id, or null for the whole topic
  kind: 'note' | 'feedback';
  type?: FeedbackType;
  text: string;
  status: 'open' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}
