export type Level = 'basic' | 'intermediate' | 'advanced';
export const LEVELS: Level[] = ['basic', 'intermediate', 'advanced'];

export interface Question {
  id: string;
  question: string;
  answer: string;
  level: Level;
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
