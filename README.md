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

## Managing the questions

The Markdown in `questions/` is **generated** — don't edit it by hand. The source of truth is `data/<topic>.json`.

```sh
npm start        # opens the manager at http://localhost:3000
npm run build    # regenerate Markdown from data/*.json without the app
```

In the app you can add topics, add/edit/delete questions, set a level (basic / intermediate / advanced), tag them, search, and star favorites. Every change is saved to JSON and the Markdown (including this index and `questions/favorites.md`) is rebuilt automatically. Requires Node 18+, no dependencies.

You can also edit a `data/*.json` file directly and run `npm run build`. A question looks like:

```json
{ "id": "any-unique-string", "question": "…", "answer": "…(Markdown)", "level": "basic", "tags": ["x"], "favorite": false }
```

## Layout

```
README.md      entry point + generated topic index
AGENTS.md      how to write/extend questions (style guide for humans and AI agents)
questions/     generated Markdown, one file per topic (+ favorites.md)
data/          JSON source of truth
app/           build script and local manager app
```

Each topic page has a numbered table of contents. Diagrams are Mermaid, which GitHub renders automatically. The app shows answers as raw Markdown, so read diagrams on GitHub or in a Mermaid-aware Markdown viewer.

Contributing questions (yourself or with an AI agent)? Read [AGENTS.md](AGENTS.md) first.
