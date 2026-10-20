import { useEffect, useRef } from 'react';
import Markdown from './Markdown';
import Inline from './Inline';
import { CloseIcon } from './Icons';
import type { Problem, Question, Topic, Variant } from './types';

interface Props {
  problems: Problem[];
  topics: Topic[];
  slug: string; // selected problem
  part: string; // 'overview' or a variant slug
  language: string; // preferred language id
  dark: boolean;
  drawer: boolean; // list open on small screens
  onSelect: (slug: string, part: string) => void;
  onLanguage: (id: string) => void;
  onOpenQuestion: (id: string) => void;
  onCloseDrawer: () => void;
}

const stable = (v?: boolean) => (v === undefined ? null : v ? 'Stable' : 'Not stable');

function Complexity({ v }: { v: Variant }) {
  const c = v.complexity ?? {};
  const chips: [string, string | undefined][] = [['Best', c.best], ['Average', c.average], ['Worst', c.worst], ['Space', c.space]];
  return (
    <div className="chips-row" aria-label="Complexity">
      {chips.filter(([, val]) => val).map(([k, val]) => <span key={k} className="stat"><span>{k}</span>{val}</span>)}
      {stable(v.stable) && <span className="stat plain">{stable(v.stable)}</span>}
      {v.inPlace !== undefined && <span className="stat plain">{v.inPlace ? 'In place' : 'Extra memory'}</span>}
    </div>
  );
}

/** The code library: a guide per problem, then each approach with code in the reader's language. */
export default function Problems({ problems, topics, slug, part, language, dark, drawer, onSelect, onLanguage, onOpenQuestion, onCloseDrawer }: Props) {
  const reader = useRef<HTMLElement>(null);
  const problem = problems.find((p) => p.slug === slug) ?? problems[0];
  const variant = problem?.variants.find((v) => v.slug === part);
  useEffect(() => { reader.current?.scrollTo({ top: 0 }); }, [problem?.slug, part]);

  const questionsById = new Map<string, { q: Question; t: Topic }>(topics.flatMap((t) => t.questions.map((q) => [q.id, { q, t }] as const)));
  const file = variant && (variant.files.find((f) => f.language === language) ?? variant.files[0]);

  return (
    <>
      <section className={'list' + (drawer ? ' open' : '')} aria-label="Problems">
        <div className="list-head">
          <div className="list-title">
            <h2>Problems</h2>
            <button className="icon-btn mobile-only" onClick={onCloseDrawer} aria-label="Close"><CloseIcon /></button>
          </div>
        </div>
        <ol className="qlist">
          {problems.map((p) => (
            <li key={p.slug} className="pgroup">
              <div className="qgroup static">{p.title}<span>{p.variants.length}</span></div>
              <button className={'qitem' + (p.slug === problem?.slug && part === 'overview' ? ' active' : '')} onClick={() => onSelect(p.slug, 'overview')}>
                <span className="qnum">📖</span>
                <span className="qtext"><span className="qtitle">Guide: how it is asked, real-life uses, how to choose</span></span>
              </button>
              {p.variants.map((v) => (
                <button key={v.slug} className={'qitem' + (p.slug === problem?.slug && part === v.slug ? ' active' : '')} onClick={() => onSelect(p.slug, v.slug)}>
                  <span className="qnum">{'{ }'}</span>
                  <span className="qtext">
                    <span className="qtitle">{v.title}</span>
                    <span className="qmeta">{v.complexity?.average ?? v.summary}</span>
                  </span>
                </button>
              ))}
            </li>
          ))}
          {!problems.length && <li className="empty">No problems yet.</li>}
        </ol>
      </section>

      <main className="reader" ref={reader}>
        {problem ? (
          <article key={problem.slug + part}>
            <div className="crumbs">
              <button className="crumb-module" onClick={() => onSelect(problem.slug, 'overview')}>{problem.title}</button>
              <span className={'badge ' + problem.level}>{problem.level}</span>
              {variant && <span className="muted">approach {problem.variants.indexOf(variant) + 1} of {problem.variants.length}</span>}
            </div>
            <h1>{variant ? variant.title : problem.title}</h1>
            <p className="lead">{variant ? variant.summary : problem.summary}</p>

            {!variant && (
              <>
                {problem.related && problem.related.length > 0 && (
                  <div className="related">
                    <span className="muted">Related questions</span>
                    {problem.related.map((id) => questionsById.get(id)).filter((x): x is { q: Question; t: Topic } => !!x).map(({ q, t }) => (
                      <button key={q.id} className="tag" onClick={() => onOpenQuestion(q.id)} title={`${t.name}`}><Inline text={q.question} /></button>
                    ))}
                  </div>
                )}
                <Markdown source={problem.overview} dark={dark} />
                <h2 className="approach-title">Approaches</h2>
                <div className="approach-cards">
                  {problem.variants.map((v) => (
                    <button key={v.slug} className="approach-card" onClick={() => onSelect(problem.slug, v.slug)}>
                      <strong>{v.title}</strong>
                      <span className="muted">{v.summary}</span>
                      <Complexity v={v} />
                    </button>
                  ))}
                </div>
              </>
            )}

            {variant && (
              <>
                <Complexity v={variant} />
                <Markdown source={variant.notes} dark={dark} />
                {variant.files.length > 0 && file && (
                  <section className="code-section" id="code">
                    <h2>Code</h2>
                    <div className="tabs lang-tabs" role="tablist" aria-label="Language">
                      {variant.files.map((f) => (
                        <button key={f.language} role="tab" aria-selected={f.language === file.language} onClick={() => onLanguage(f.language)}>{f.name}</button>
                      ))}
                    </div>
                    <Markdown source={'```' + file.fence + '\n' + file.code.trimEnd() + '\n```'} dark={dark} />
                    {variant.expected.trim() && (
                      <details className="expected">
                        <summary>Expected output (the same in every language)</summary>
                        <pre>{variant.expected.trim()}</pre>
                      </details>
                    )}
                  </section>
                )}
              </>
            )}

            <nav className="pager">
              {(() => {
                const order = ['overview', ...problem.variants.map((v) => v.slug)];
                const i = order.indexOf(part);
                const go = (d: number) => onSelect(problem.slug, order[i + d]);
                return (
                  <>
                    <button className="btn" onClick={() => go(-1)} disabled={i <= 0}>Previous</button>
                    <button className="btn" onClick={() => go(1)} disabled={i >= order.length - 1}>Next</button>
                  </>
                );
              })()}
            </nav>
          </article>
        ) : (
          <div className="empty-state"><h1>No problems yet</h1><p>They live in the problems/ folder.</p></div>
        )}
      </main>
    </>
  );
}
