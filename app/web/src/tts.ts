// Turns the Markdown of an answer into speakable chunks, grouped by top-level block.
//
// The renderer (Markdown.tsx) tags every top-level block with the same index computed here,
// so "play from this paragraph" and "highlight what is being read" line up exactly.
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const MAX_CHUNK = 200; // browsers cut off long utterances, and short chunks make pause/resume precise

const parser = unified().use(remarkParse).use(remarkGfm);

/** Minimal shape of an mdast node; avoids depending on the full type union. */
interface N {
  type: string;
  value?: string;
  alt?: string | null;
  lang?: string | null;
  children?: N[];
  position?: { start: { offset?: number } };
}

export interface Block {
  /** character offset of the block in the source, used to match rendered elements */
  offset: number;
  /** speakable chunks; empty for blocks that are silent (e.g. a rule) */
  chunks: string[];
}

function cleanForSpeech(s: string): string {
  return s
    .replace(/❌/g, 'Bad: ')
    .replace(/✅/g, 'Good: ')
    .replace(/⚠️?/g, 'Warning: ')
    .replace(/\be\.g\.,?/gi, 'for example,')
    .replace(/\bi\.e\.,?/gi, 'that is,')
    .replace(/\bvs\.?(?=\s)/gi, 'versus')
    .replace(/\s*(->|=>|→)\s*/g, ' to ')
    .replace(/<-/g, ' from ')
    .replace(/&/g, ' and ')
    .replace(/[~^|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Split a block of text into sentence-sized chunks of at most MAX_CHUNK characters. */
function splitText(text: string): string[] {
  const sentences = text.split(/(?<=[.!?;:])\s+/);
  const out: string[] = [];
  let cur = '';
  const flush = () => {
    if (cur) out.push(cur);
    cur = '';
  };
  for (const s of sentences) {
    if (s.length > MAX_CHUNK) {
      flush();
      let rest = s;
      while (rest.length > MAX_CHUNK) {
        let cut = rest.lastIndexOf(', ', MAX_CHUNK);
        if (cut < 40) cut = rest.lastIndexOf(' ', MAX_CHUNK);
        if (cut < 1) cut = MAX_CHUNK;
        out.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(cut + 1).trim();
      }
      cur = rest;
    } else if ((cur + ' ' + s).trim().length > MAX_CHUNK) {
      flush();
      cur = s;
    } else {
      cur = (cur + ' ' + s).trim();
    }
  }
  flush();
  return out;
}

/** Plain text of inline content (markdown syntax already stripped by the parser). */
function inline(n: N): string {
  switch (n.type) {
    case 'text':
    case 'inlineCode':
      return n.value ?? '';
    case 'break':
      return ' ';
    case 'image':
      return n.alt ?? '';
    case 'html':
    case 'code':
      return '';
    default:
      return (n.children ?? []).map(inline).join('');
  }
}

/** Sentences for one block-level node. Each entry is spoken as its own sentence. */
function sentences(n: N, announceCode: boolean): string[] {
  switch (n.type) {
    case 'heading':
      return [inline(n)];
    case 'paragraph':
      return [inline(n)];
    case 'list':
    case 'listItem':
    case 'blockquote':
      return (n.children ?? []).flatMap((c) => sentences(c, announceCode));
    case 'table':
      return (n.children ?? []).map((row) => (row.children ?? []).map(inline).filter(Boolean).join(', '));
    case 'code':
      if (!announceCode) return [];
      return [n.lang === 'mermaid' ? 'There is a diagram on screen.' : 'There is a code example on screen.'];
    default:
      return [];
  }
}

function toChunks(parts: string[]): string[] {
  return parts.flatMap((raw) => {
    const text = cleanForSpeech(raw);
    if (!/[\p{L}\p{N}]/u.test(text)) return [];
    return splitText(/[.!?:;]$/.test(text) ? text : text + '.');
  });
}

const cache = new Map<string, Block[]>();

/** Top-level blocks of a Markdown document, in order. Index in this array = block index everywhere. */
export function parseBlocks(markdown: string, announceCode: boolean): Block[] {
  const key = `${announceCode ? 1 : 0}:${markdown}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const root = parser.parse(markdown) as unknown as N;
  const blocks = (root.children ?? []).map((n) => ({
    offset: n.position?.start.offset ?? -1,
    chunks: toChunks(sentences(n, announceCode)),
  }));
  if (cache.size > 300) cache.clear();
  cache.set(key, blocks);
  return blocks;
}

/** Map from a block's source offset to its index; used by the renderer to tag elements. */
export function blockIndexByOffset(markdown: string): Map<number, number> {
  return new Map(parseBlocks(markdown, true).map((b, i) => [b.offset, i]));
}

export interface Step {
  kind: 'speak' | 'wait';
  text: string; // spoken text, or the label for a wait
  ms?: number;
  part?: 'question' | 'answer';
  block?: number; // index of the answer block this step reads
}

export interface PlayerSettings {
  rate: number;
  voice: string;
  quiz: boolean; // question, thinking pause, then answer
  thinkSeconds: number;
  gapSeconds: number;
  autoNext: boolean;
  announceCode: boolean;
  follow: boolean; // scroll the block being read into view
}

export function buildSteps(number: number, question: string, answer: string, s: PlayerSettings): Step[] {
  const title = cleanForSpeech(question.replace(/`/g, ''));
  const steps: Step[] = [{ kind: 'speak', part: 'question', text: `Question ${number}. ${title}` }];
  if (s.quiz && s.thinkSeconds > 0) steps.push({ kind: 'wait', text: 'Think about your answer', ms: s.thinkSeconds * 1000 });
  else steps.push({ kind: 'wait', text: '', ms: 700 });
  steps.push({ kind: 'speak', part: 'answer', text: 'Answer.' });
  parseBlocks(answer, s.announceCode).forEach((b, i) => {
    for (const chunk of b.chunks) steps.push({ kind: 'speak', part: 'answer', text: chunk, block: i });
  });
  if (s.gapSeconds > 0) steps.push({ kind: 'wait', text: 'Next question coming up', ms: s.gapSeconds * 1000 });
  return steps;
}
