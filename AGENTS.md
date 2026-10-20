# AGENTS.md — how to create content in this repo

This repo is an interview-preparation question bank. Humans read the generated Markdown on GitHub; the data lives in JSON. Follow this file whenever you add or edit questions.

## Hard rules

1. **Edit only `data/<topic>.json`.** Never hand-edit `questions/*.md` or the table between `<!-- TOPICS:START -->` / `<!-- TOPICS:END -->` in `README.md`. They are generated.
2. After any change run `npm run build` and commit the JSON **and** the regenerated Markdown together.
3. Never remove or change `id` or `favorite` of existing questions (the user stars them in the app). Append new questions; fix wording in place.
4. A topic is one file: `data/<slug>.json` with `{ "name": "...", "questions": [...] }`. Slug is lowercase, `a-z0-9-`.
5. `app/build.js` and `app/server.js` stay zero-dependency Node. UI dependencies live only in `app/web/package.json`.
6. The UI tags each top-level Markdown block (paragraph, list, table, code block, diagram) so users can start audio from it. Keep answers as normal Markdown: no raw HTML, because it is skipped when read aloud.

## Question schema

```json
{
  "id": "golang-042",
  "question": "How does a buffered channel differ from an unbuffered one?",
  "answer": "Markdown…",
  "level": "basic | intermediate | advanced",
  "tags": ["concurrency", "channels"],
  "favorite": false
}
```

- `id`: `<slug>-<3 digit number>`, unique, never reused.
- Order in the array is the reading order inside each level. Put prerequisites first.
- Levels: **basic** = what a new Go/React/etc. developer must know; **intermediate** = day-to-day production work; **advanced** = internals, performance, design, and tricky edge cases.

## Writing style

The reader is preparing for interviews and wants to *understand*, not memorise.

- **Simple English.** Short sentences. Explain jargon the first time. Say "the goroutine waits", not "the goroutine parks on the sudog queue" (unless the question is about internals, then explain the term).
- **Every answer follows this shape** (skip a part only if it truly doesn't apply):
  1. **Short answer** — one to three sentences you could say out loud in an interview.
  2. **Explanation** — why it works that way, in plain words, with a small analogy when helpful.
  3. **Example** — a small, correct, self-contained code block with comments and the expected output.
  4. **Diagram** — a Mermaid diagram when a flow, lifecycle, or structure is easier to *see* (see below).
  5. **Common mistakes / gotchas** — what people get wrong and how to avoid it.
  6. **Interview tip** — how to phrase it, or the follow-up question to expect.
- Aim for 150–400 words plus code. Longer is fine for design/internals questions; never pad.
- Use headings inside answers sparingly (`####` only), bold for key terms, tables for comparisons.
- Prefer one idea per question. Split big topics into several questions.

## Code examples

- Must be **correct and runnable** (for Go: a full `package main` when practical; otherwise a clearly marked fragment). Mentally compile every example; if Go is installed, run it with `go run` or `go vet`.
- Keep them small (under ~30 lines). Use realistic names (`orders`, `userID`), not `foo/bar`, unless it is a language-trivia question.
- Show the output in a comment (`// prints: 3`) when it teaches something.
- Mark wrong code with `// ❌ bad` and the fix with `// ✅ good`.
- Use the fence language tag (` ```go `, ` ```yaml `, ` ```bash `, ` ```tsx `).

## Mermaid diagrams

GitHub renders ` ```mermaid ` blocks. Use them when they help: lifecycles, request flows, scheduler/GC models, state machines, architecture, sequence of messages. Do not add one just for decoration.

- Prefer `flowchart LR/TD`, `sequenceDiagram`, `stateDiagram-v2`.
- Keep to ~5–12 nodes. Short labels. Wrap labels containing `()`, `:`, `/` or quotes in double quotes: `A["ctx.Done()"]`.
- No HTML, no custom styling, no `<br/>` tricks beyond the basics, so it renders in light and dark themes.
- Add a one-line caption sentence before or after the diagram explaining how to read it.

## Quality checklist (before committing)

- [ ] JSON is valid and ids are unique (`npm run build` fails loudly if not).
- [ ] Answer follows the shape above and the code is correct.
- [ ] No claim you are unsure about. Verify version-specific facts (e.g. Go 1.22 loop variable change, Go 1.21 `slog`) and say the version.
- [ ] Reads well in the generated `questions/<slug>.md` (check the diagram and code fences render).
- [ ] Relevant to a Technical Lead interview: include trade-offs ("when would you NOT do this") and production experience angles, not only definitions.

## Adding a new topic

1. Create `data/<slug>.json` with `name` and an empty `questions` list (or use "New topic" in the app).
2. Plan the outline first: basics → intermediate → advanced, ~30–100 questions for a major topic.
3. Write questions in batches by theme, then `npm run build`.

## About the person preparing

Technical Lead (Thales, avionics in-flight entertainment — FlytEDGE). Stack: React/TypeScript, Go, Node.js/NestJS, Python, .NET, Kubernetes, Docker, Azure, GitLab CI/CD, Datadog, PostgreSQL/MS SQL. Where natural, connect questions to microservices, cloud-native delivery, observability, and leading a team.
