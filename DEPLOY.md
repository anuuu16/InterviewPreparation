# Hosting on Cloudflare Pages (free, fully static)

The hosted site is only static files: no Node server, no Functions, no database. `npm start` (the local app) is unchanged.

**Works hosted:** reading, search, filters, Home, progress, favorites, private notes, code problems, resources, browser voices.
**Turned off hosted (use the local app for them):** Interview prep (resume and job description analysis) and study sets.
**Also off (they need to write to the repo):** add, edit and delete questions, new topics, adding or removing resources, "feedback for the author", and the Piper voice.
**Stored in the browser only (localStorage):** favorites, notes, progress and layout. They do not sync between devices. Clearing site data removes them.

Content changes happen locally (`data/*.json`, import, validate), then `git push` redeploys the site.

## Choose what the hosted site shows

`app/web/hosted-features.json` lists the features of the **hosted build only** (`true` shows, `false` hides). The local app always has everything.

| Flag | Controls |
| --- | --- |
| `interviewPrep` | the Interview prep page (resume and job description analysis) |
| `studySets` | saved study sets in the sidebar and on Home |
| `editQuestions` | add and edit question buttons |
| `newTopic` | the New topic button |
| `resourceEditing` | add and remove resources |
| `authorFeedback` | the "Feedback for the author" tab in Notes |

Edit the file, push, and Cloudflare rebuilds. Edits and feedback only make sense locally, because the hosted site cannot write to the repo.

## Deploy

1. Push the repo to GitHub (already done).
2. Cloudflare dashboard, Workers & Pages, Create, Pages, Connect to Git, pick this repo.
   - Build command: `npm --prefix app/web ci && npm run build:static`
   - Build output directory: `app/web/dist-static`
   - Environment variable: `NODE_VERSION` = `20` (or newer)
3. Each push to `main` redeploys.

The site is public. The question bank has no personal data and the private `personal/` folder is never exported. If you want it private, put Cloudflare Access in front of it.

## Try it locally

```sh
npm run build:static
npx wrangler pages dev app/web/dist-static     # or any static file server on that folder
```
