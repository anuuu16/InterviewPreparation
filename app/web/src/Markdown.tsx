import { isValidElement, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { common } from 'lowlight';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import protobuf from 'highlight.js/lib/languages/protobuf';
import Mermaid from './Mermaid';
import { PlayIcon } from './Icons';
import { blockIndexByOffset } from './tts';

const languages = { ...common, dockerfile, protobuf };

interface HNode {
  type: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
  position?: { start: { offset?: number } };
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}

const blockOf = (node?: { properties?: Record<string, unknown> }) => node?.properties?.dataBlock as number | undefined;

function CodeBlock({ lang, block, children }: { lang: string; block?: number; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(textOf(children)).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="codeblock" data-block={block}>
      <div className="codeblock-bar">
        <span>{lang && lang !== 'text' ? lang : 'code'}</span>
        <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre>{children}</pre>
    </div>
  );
}


const REHYPE_HIGHLIGHT = [rehypeHighlight, { languages, ignoreMissing: true }] as const;

/**
 * The rendered Markdown. Memoized and given stable plugin/component objects: if these were re-created on every
 * render, React would see "new" component types, throw the DOM away and rebuild it (diagrams and code blocks
 * would flash on every hover or player update).
 */
const Body = memo(function Body({ source, dark }: { source: string; dark: boolean }) {
  const rehypePlugins = useMemo(() => {
    const byOffset = blockIndexByOffset(source);
    // tag each top-level element with the same block index the speech code uses
    const tagBlocks = () => (tree: HNode) => {
      for (const n of tree.children ?? []) {
        const idx = n.type === 'element' ? byOffset.get(n.position?.start.offset ?? -1) : undefined;
        if (idx !== undefined) n.properties = { ...n.properties, dataBlock: idx };
      }
    };
    return [tagBlocks, REHYPE_HIGHLIGHT] as never[];
  }, [source]);

  const components = useMemo(
    () => ({
      pre({ node, children }: { node?: { properties?: Record<string, unknown> }; children?: ReactNode }) {
        const block = blockOf(node);
        const code = Array.isArray(children) ? children[0] : children;
        if (isValidElement<{ className?: string; children?: ReactNode }>(code)) {
          const lang = /language-(\w+)/.exec(code.props.className ?? '')?.[1] ?? '';
          if (lang === 'mermaid') return <Mermaid code={textOf(code.props.children).trim()} dark={dark} block={block} />;
          return <CodeBlock lang={lang} block={block}>{code}</CodeBlock>;
        }
        return <pre data-block={block}>{children}</pre>;
      },
      table({ node, children }: { node?: { properties?: Record<string, unknown> }; children?: ReactNode }) {
        return (
          <div className="table-wrap" data-block={blockOf(node)}>
            <table>{children}</table>
          </div>
        );
      },
      a({ href, children }: { href?: string; children?: ReactNode }) {
        return (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      },
    }),
    [dark],
  );

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypePlugins} components={components}>
      {source}
    </ReactMarkdown>
  );
});

interface Props {
  source: string;
  dark: boolean;
  /** Show a "play from here" button next to the hovered/tapped block. */
  onPlayBlock?: (block: number) => void;
  /** Block currently being read aloud; it is highlighted. */
  activeBlock?: number | null;
  /** Scroll the active block into view. */
  follow?: boolean;
}

export default function Markdown({ source, dark, onPlayBlock, activeBlock = null, follow = false }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null); // block under the pointer
  const [top, setTop] = useState(0);

  useEffect(() => setHover(null), [source]);

  // position the play button next to its block; re-measure when content shifts (diagrams, fonts)
  const measure = useCallback(() => {
    const el = hover === null ? null : root.current?.querySelector<HTMLElement>(`[data-block="${hover}"]`);
    if (el) setTop(el.offsetTop);
  }, [hover]);
  useLayoutEffect(measure, [measure, source]);
  useEffect(() => {
    if (!root.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(root.current);
    return () => ro.disconnect();
  }, [measure]);

  // highlight (and optionally follow) the block being read
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll('.speaking').forEach((n) => n.classList.remove('speaking'));
    if (activeBlock === null) return;
    const target = el.querySelector<HTMLElement>(`[data-block="${activeBlock}"]`);
    target?.classList.add('speaking');
    if (follow) target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeBlock, follow, source]);

  const track = (e: MouseEvent) => {
    if (!onPlayBlock) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-block]');
    if (!el || !root.current?.contains(el)) return; // keep the last one so the button stays reachable
    setHover(Number(el.dataset.block));
  };

  return (
    <div className="prose" ref={root} onMouseOver={track} onClick={track}>
      {onPlayBlock && hover !== null && (
        <button
          type="button"
          className="block-play"
          style={{ top }}
          onClick={(e) => {
            e.stopPropagation();
            onPlayBlock(hover);
          }}
          aria-label="Play from here"
          title="Play from here"
        >
          <PlayIcon />
        </button>
      )}
      <Body source={source} dark={dark} />
    </div>
  );
}
