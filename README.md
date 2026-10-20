# Interview Preparation

Interview questions and answers, organised by language/topic. Read them right here on GitHub (or any Markdown viewer) — start from the index below.

## Topics

<!-- TOPICS:START -->
| Topic | Total | Basic | Intermediate | Advanced | ⭐ |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Golang](questions/golang.md) | 126 | 28 | 78 | 20 | 0 |
| [JavaScript](questions/javascript.md) | 4 | 2 | 1 | 1 | 0 |
| [Kubernetes](questions/kubernetes.md) | 13 | 4 | 6 | 3 | 0 |
| [Microservices](questions/microservices.md) | 12 | 3 | 6 | 3 | 0 |
| [Node.js](questions/nodejs.md) | 10 | 3 | 5 | 2 | 0 |
| [React](questions/react.md) | 12 | 4 | 5 | 3 | 0 |

[⭐ All favorites](questions/favorites.md)
<!-- TOPICS:END -->

## Study app (read, listen, manage)

A local web app for reading and listening. It is a React + TypeScript UI (light and dark theme) on top of a zero-dependency Node server.

```sh
npm run setup    # once: installs and builds the UI (needs Node 18+)
npm start        # http://localhost:3000   (PORT=4000 npm start to change the port)
```

- **Read:** proper Markdown rendering: syntax-highlighted code with a copy button, tables, Mermaid diagrams, inline code. Search across everything, filter by level, browse by topic.
- **Listen:** the player at the bottom reads questions and answers aloud with your browser's text-to-speech. Play, pause, previous/next, speed, voice, auto-continue, a pause between questions, and **quiz mode** (asks the question, gives you thinking time, then reads the answer). Code and diagrams are skipped, with a short mention.
- **Start anywhere:** hover (or tap) any paragraph, list, table or code block in an answer and press ▶ to listen from exactly there; hover a question in the list to play from that question. The block being read is highlighted and scrolled into view.
- **Manage:** star favorites, add/edit/delete questions (with a live Markdown preview) and create topics. Every change is saved to `data/*.json` and the Markdown on GitHub is regenerated automatically.
- **Keys:** `Space` play/pause, `←` `→` previous/next, `F` favorite, `/` search.

Developing the UI: run `npm start` in one terminal and `npm run dev` in another (hot reload on http://localhost:5173, API proxied to port 3000).

## Without the app

The Markdown in `questions/` is **generated** — don't edit it by hand. The source of truth is `data/<topic>.json`. Edit it directly if you like, then:

```sh
npm run build    # regenerate Markdown from data/*.json
```

A question looks like:

```json
{ "id": "golang-001", "question": "…", "answer": "…(Markdown)", "level": "basic", "tags": ["x"], "favorite": false }
```

## Layout

```
README.md      entry point + generated topic index
AGENTS.md      how to write/extend questions (style guide for humans and AI agents)
questions/     generated Markdown, one file per topic (+ favorites.md)
data/          JSON source of truth
app/           build.js (JSON to Markdown), server.js (API), web/ (React + TypeScript UI)
```

Each topic page has a numbered table of contents. Diagrams are Mermaid, which GitHub renders automatically. The app shows answers as raw Markdown, so read diagrams on GitHub or in a Mermaid-aware Markdown viewer.

Contributing questions (yourself or with an AI agent)? Read [AGENTS.md](AGENTS.md) first.
