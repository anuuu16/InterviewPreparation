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
  remove?: boolean; // Personal topics only: marked for the author/agent to delete later
}

export interface Topic {
  slug: string;
  name: string;
  group?: string; // sidebar section, e.g. "Languages & Runtimes"
  questions: Question[];
}

/** A question as shown in the list, with where it came from and its display number. */
export interface Item {
  q: Question;
  topic: Topic;
  number: number;
}

export type View =
  | { kind: 'home' }
  | { kind: 'topic'; slug: string }
  | { kind: 'favorites' }
  | { kind: 'all' }
  | { kind: 'problems' }
  | { kind: 'interview' }
  | { kind: 'set'; id: string };

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

export interface CodeFile {
  language: string; // id, e.g. "go"
  name: string; // display name, e.g. "Go"
  fence: string; // highlight.js language
  file: string;
  code: string;
}

export interface Variant {
  slug: string;
  title: string;
  summary: string;
  complexity?: { best?: string; average?: string; worst?: string; space?: string };
  stable?: boolean;
  inPlace?: boolean;
  notes: string;
  expected: string;
  files: CodeFile[];
}

export interface Problem {
  slug: string;
  title: string;
  summary: string;
  level: Level;
  tags: string[];
  related?: string[]; // question ids
  overview: string;
  variants: Variant[];
}

export type ResourceType = 'official-docs' | 'tutorial' | 'article' | 'video' | 'book' | 'course' | 'reference' | 'tool' | 'repo';

/** A link to read at the source: official docs, a tutorial, a reference. */
export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  description: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  module?: string; // matches a question module, used for "Further reading"
}

/** A saved selection of questions from the bank, for example one made for a job description. */
export interface StudySet {
  id: string;
  name: string;
  createdAt: number;
  ids: string[]; // question ids, in reading order
  note?: string; // where it came from
}
