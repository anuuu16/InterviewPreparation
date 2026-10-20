# Interview Preparation

Interview questions and answers, organised by language/topic. Read them right here on GitHub (or any Markdown viewer) — start from the index below.

## Topics

<!-- TOPICS:START -->
| Topic | Total | Basic | Intermediate | Advanced | ⭐ |
| --- | ---: | ---: | ---: | ---: | ---: |
| [AI Engineering](questions/ai-engineering.md) | 72 | 22 | 37 | 13 | 0 |
| [Azure & Cloud](questions/azure-cloud.md) | 71 | 20 | 30 | 21 | 0 |
| [Databases](questions/databases.md) | 76 | 20 | 34 | 22 | 0 |
| [Design Principles](questions/design-principles.md) | 83 | 22 | 43 | 18 | 0 |
| [DevOps & CI/CD](questions/devops-ci-cd.md) | 65 | 17 | 32 | 16 | 0 |
| [Git & Version Control](questions/git-version-control.md) | 33 | 20 | 11 | 2 | 0 |
| [Golang](questions/golang.md) | 126 | 28 | 78 | 20 | 0 |
| [JavaScript](questions/javascript.md) | 66 | 20 | 34 | 12 | 1 |
| [Kubernetes](questions/kubernetes.md) | 57 | 15 | 28 | 14 | 0 |
| [Leadership & Behavioral](questions/leadership-behavioral.md) | 63 | 16 | 34 | 13 | 0 |
| [Microservices](questions/microservices.md) | 55 | 13 | 29 | 13 | 0 |
| [Networking & Security](questions/networking-security.md) | 73 | 20 | 39 | 14 | 0 |
| [Node.js](questions/nodejs.md) | 65 | 17 | 28 | 20 | 0 |
| [React](questions/react.md) | 57 | 15 | 28 | 14 | 0 |
| [System Design](questions/system-design.md) | 67 | 17 | 29 | 21 | 0 |
| [TypeScript](questions/typescript.md) | 58 | 20 | 35 | 3 | 0 |

[⭐ All favorites](questions/favorites.md)
<!-- TOPICS:END -->

## Problems

Popular coding problems with a written guide and tested code in several languages (sorting first). Open a problem to see how interviewers ask it, real-life uses and every approach from simple to optimal.

<!-- PROBLEMS:START -->
| Problem | Approaches | Languages |
| --- | ---: | ---: |
| [Sorting](problems/sorting/README.md) | 7 | 7 |
| [Binary search](problems/binary-search/README.md) | 5 | 7 |
| [Two sum](problems/two-sum/README.md) | 3 | 7 |
<!-- PROBLEMS:END -->

## Study app (read, listen, manage)

A local web app for reading and listening: React + TypeScript on top of a zero-dependency Node server, with light and dark themes.

```sh
npm run setup    # once: installs and builds the UI (needs Node 18+)
npm start        # http://localhost:3000   (PORT=4000 npm start to change the port)
```

The screen stays simple. Topics on the left, the question list in the middle, the answer on the right. Everything else appears only when you need it:

- **Read:** rendered Markdown with syntax-highlighted code (copy button), tables, Mermaid diagrams and inline code. Search is always visible; the **Filters** button reveals *group by Level or Module*, a module filter and level chips.
- **Listen:** press **Listen** (or hover a paragraph and press ▶ to start from exactly there). The player bar appears only while audio is playing and closes when you stop it. Pause, previous/next, speed, auto-continue, and **quiz mode** (asks, waits for you to think, then answers) live in *Audio settings* (the gear in the sidebar or the player).
- **Reading styles:** *Explain* (default) narrates like a mentor: "In short, …", skips bracketed asides, trims long lists and tables, points to code on screen. *Brief* reads only the short answer and interview tip. *Full* reads everything. Rule-based, not an AI model.
- **Voices:** pick any voice your browser offers (grouped by language, with samples), or install the optional local **Piper** voice (below). The app uses Piper when it is installed and falls back to the browser voice automatically.
- **Notes and feedback:** the **Notes** button on a question saves a private note, or *feedback for the author* ("needs more detail", "code issue", "incorrect"…), about the question or the whole topic. Feedback is stored in `feedback/` and the next agent run fixes it (see [AGENTS.md](AGENTS.md), section 14).
- **Code problems:** a separate section with popular problems (sorting, binary search, two sum…): a guide (how it is asked, real-life uses, how to choose), every approach from simple to optimal with an explanation, and tested code in many languages. Your language choice is remembered.
- **Manage:** star favorites; add, edit, delete questions (live Markdown preview); create topics. Every change is written to `data/*.json` and the Markdown on GitHub is regenerated.
- **Keys:** `Space` play/pause, `←` `→` previous/next, `F` favorite, `/` search.

### Optional: a better voice (Piper, English only)

```sh
npm run tts:setup        # installs Piper and ONE English voice (about 60 MB); needs Python 3
```

Restart `npm start`. Nothing else to configure; see [tools/piper/README.md](tools/piper/README.md) for other voices and proxy notes.

### Developing the UI

Run `npm start` in one terminal and `npm run dev` in another (hot reload on http://localhost:5173, API proxied to port 3000).

## Without the app

The Markdown in `questions/` and `problems/*/README.md` is **generated**: don't edit it by hand. The sources are `data/<topic>.json` and the folders in `problems/`. After editing them:

```sh
npm run build        # regenerate the Markdown pages and the tables in this README
npm run validate     # quality checks
```

## Layout

```
README.md       entry point + generated indexes
AGENTS.md       the rulebook for adding questions and problems (humans and AI agents)
questions/      generated Markdown, one page per topic (+ favorites.md)
data/           question source of truth (JSON)
problems/       code problems: guide + tested solutions per language
feedback/       notes and feedback written in the app
app/            build, import, validate, feedback, problems runner, API server, web/ (React UI)
tools/piper/    optional local text-to-speech
```

Each topic page has a numbered contents list and a "Browse by module" table. Diagrams are Mermaid, which GitHub renders automatically.

Contributing questions or problems (yourself or with an AI agent)? Read [AGENTS.md](AGENTS.md) first.
