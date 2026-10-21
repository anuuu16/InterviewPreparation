// The hosted site has no Piper voice: the app falls back to the browser voices.
export const onRequest = () => new Response(JSON.stringify({ available: false, voices: [], note: 'not installed' }), { headers: { 'Content-Type': 'application/json' } });
