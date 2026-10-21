# Hosting on Cloudflare Pages (free, no Node server)

The hosted site is static files plus one small Function. `npm start` (the local Node app) is unchanged.

**What works hosted:** reading, search, filters, Home, Interview prep, study sets, progress, favorites, notes and feedback, editing and adding questions, browser voices.
**What does not:** the Piper voice (browser voices are used) and automatic writes to `data/*.json`. Edits made on the site live in an *overlay* (browser storage, plus Cloudflare KV if you bind it). Copy what you want to keep into `data/*.json` yourself.

## Deploy

1. Push the repo to GitHub (already done).
2. Cloudflare dashboard, Workers & Pages, Create, Pages, Connect to Git, pick this repo.
   - Build command: `npm --prefix app/web ci && npm run build:static`
   - Build output directory: `app/web/dist-static`
   - Environment variable: `NODE_VERSION` = `20` (or newer)
3. Each push to `main` redeploys.

## Sync between devices (optional)

Without this, favorites, edits and notes stay in the browser you used.

1. Workers & Pages, KV, create a namespace (for example `interview-prep`).
2. Your Pages project, Settings, Bindings, add a KV namespace binding named `IP_KV`.
3. Settings, Variables and Secrets, add a secret `EDIT_TOKEN` (any long random string). The site asks for it once per browser.
   Alternative: put Cloudflare Access in front of the site instead.

The notes are stored as one JSON document under the key `overlay`. Without `EDIT_TOKEN` or Access, anyone with the URL can read and overwrite it.

## Try it locally

```sh
npm run build:static              # writes app/web/dist-static
npx wrangler pages dev app/web/dist-static    # serves it with Functions; add --kv IP_KV to test sync
```

Notes: the private `personal/` folder is never exported. Re-run the build after changing `data/*.json`.
