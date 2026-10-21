// Cloudflare Pages Function: stores your edits, favorites and notes (one JSON document) in Workers KV.
// Bind a KV namespace named IP_KV. Optional: set the secret EDIT_TOKEN to require the x-edit-token header
// (use it, or Cloudflare Access, so strangers cannot read or overwrite your notes).
const KEY = 'overlay';
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function onRequest({ request, env }) {
  if (!env.IP_KV) return json({ error: 'KV not bound' }, 404);
  if (env.EDIT_TOKEN && request.headers.get('x-edit-token') !== env.EDIT_TOKEN) return json({ error: 'Unauthorized' }, 401);
  if (request.method === 'GET') return json(await env.IP_KV.get(KEY, 'json'));
  if (request.method === 'PUT') {
    const body = await request.text();
    if (body.length > 5_000_000) return json({ error: 'Too large' }, 413);
    JSON.parse(body); // reject anything that is not JSON
    await env.IP_KV.put(KEY, body);
    return json({ ok: true });
  }
  return json({ error: 'Method not allowed' }, 405);
}
