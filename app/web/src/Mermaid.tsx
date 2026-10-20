import { useEffect, useState } from 'react';

type MermaidApi = typeof import('mermaid').default;
let loader: Promise<MermaidApi> | null = null;
let counter = 0;

// Rendered SVGs by theme + source. A diagram that is shown again (new mount, re-render, back to a question) appears instantly instead of flashing "Rendering diagram…".
const svgCache = new Map<string, string>();

// Mermaid is large, so it is only downloaded when an answer actually contains a diagram.
const loadMermaid = () => (loader ??= import('mermaid').then((m) => m.default));

/** Download Mermaid and its flowchart/sequence/state renderers in the background so the first diagram is instant. */
export function warmMermaid() {
  void loadMermaid().then(async (mermaid) => {
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
    for (const [i, code] of ['flowchart LR\n A-->B', 'sequenceDiagram\n A->>B: hi', 'stateDiagram-v2\n [*] --> A'].entries()) {
      try {
        await mermaid.render(`mermaid-warm-${i}`, code);
      } catch {
        /* warm-up only */
      }
      document.getElementById(`dmermaid-warm-${i}`)?.remove();
    }
  });
}

export default function Mermaid({ code, dark, block }: { code: string; dark: boolean; block?: number }) {
  const key = (dark ? 'dark:' : 'light:') + code;
  const [svg, setSvg] = useState(() => svgCache.get(key) ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    const cached = svgCache.get(key);
    if (cached !== undefined) {
      setSvg(cached);
      setError('');
      return;
    }
    let cancelled = false;
    const id = `mermaid-${++counter}`;
    setError('');
    loadMermaid().then(async (mermaid) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: dark ? 'dark' : 'default',
        fontFamily: 'inherit',
        flowchart: { htmlLabels: true, curve: 'basis' },
      });
      try {
        const out = await mermaid.render(id, code);
        svgCache.set(key, out.svg);
        if (!cancelled) setSvg(out.svg);
      } catch (e) {
        document.getElementById(`d${id}`)?.remove(); // mermaid leaves a stray node on failure
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [key, code, dark]);

  if (error)
    return (
      <div className="diagram-error" data-block={block}>
        <strong>Diagram could not be rendered.</strong>
        <pre>{code}</pre>
      </div>
    );
  if (!svg) return <div className="diagram diagram-loading" data-block={block}>Rendering diagram…</div>;
  return <div className="diagram" data-block={block} role="img" aria-label="Diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
