#!/usr/bin/env python3
"""Local Piper text-to-speech server for the study app.

Plain standard-library HTTP (no web framework). Listens on 127.0.0.1 only; the
app's Node server starts it and proxies to it. Voice models are loaded lazily.

  GET  /health  -> {"status": "ok", "voices": [{"id", "language", "quality", "sampleRate"}]}
  POST /speak   {"text": str, "voice"?: str, "length_scale"?: float, "sentence_silence"?: float}
                -> audio/wav

Voices are the *.onnx files (with their .onnx.json) in ./voices; the voice id is
the file name without extension, e.g. "en_US-lessac-medium".
"""

import argparse
import io
import json
import sys
import wave
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock

try:
    from piper import PiperVoice, SynthesisConfig
except ImportError:
    sys.exit("piper-tts is not installed. Run: npm run tts:setup")

VOICES_DIR = Path(__file__).parent / "voices"
MAX_TEXT = 2000
MAX_BODY = 64 * 1024

_models: dict[str, PiperVoice] = {}
_lock = Lock()  # one synthesis at a time; ONNX sessions and the model cache are shared


def available_voices() -> list[dict]:
    voices = []
    for model in sorted(VOICES_DIR.glob("*.onnx")):
        cfg_path = model.with_suffix(".onnx.json")
        if not cfg_path.exists():
            continue
        try:
            cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        voices.append(
            {
                "id": model.stem,
                "language": cfg.get("language", {}).get("code", ""),
                "quality": cfg.get("audio", {}).get("quality", ""),
                "sampleRate": cfg.get("audio", {}).get("sample_rate"),
            }
        )
    return voices


def load(voice_id: str) -> PiperVoice:
    if voice_id not in _models:
        _models[voice_id] = PiperVoice.load(str(VOICES_DIR / f"{voice_id}.onnx"))
    return _models[voice_id]


def synthesize(text: str, voice_id: str, length_scale: float | None, sentence_silence: float) -> bytes:
    with _lock:
        voice = load(voice_id)
        config = SynthesisConfig(length_scale=length_scale)
        # whole samples, 2 bytes each, so we never write half a 16-bit frame
        silence = bytes(int(voice.config.sample_rate * sentence_silence) * 2)
        buffer = io.BytesIO()
        with wave.open(buffer, "wb") as wav:
            for i, chunk in enumerate(voice.synthesize(text, config)):
                if i == 0:
                    wav.setframerate(chunk.sample_rate)
                    wav.setsampwidth(chunk.sample_width)
                    wav.setnchannels(chunk.sample_channels)
                elif silence:
                    wav.writeframes(silence)
                wav.writeframes(chunk.audio_int16_bytes)
        return buffer.getvalue()


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args):  # keep the console quiet
        pass

    def _send(self, code: int, body: bytes, content_type: str) -> None:
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _json(self, code: int, payload: dict) -> None:
        self._send(code, json.dumps(payload).encode("utf-8"), "application/json")

    def do_GET(self):
        if self.path == "/health":
            return self._json(200, {"status": "ok", "voices": available_voices()})
        self._json(404, {"error": "not found"})

    def do_POST(self):
        if self.path != "/speak":
            return self._json(404, {"error": "not found"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_BODY:
                return self._json(413, {"error": "bad body size"})
            body = json.loads(self.rfile.read(length))
        except (ValueError, OSError):
            return self._json(400, {"error": "invalid JSON"})

        text = str(body.get("text", "")).strip()
        if not text:
            return self._json(400, {"error": "text must not be blank"})
        if len(text) > MAX_TEXT:
            return self._json(413, {"error": f"text longer than {MAX_TEXT} characters"})

        voices = {v["id"] for v in available_voices()}
        voice_id = body.get("voice") or (sorted(voices)[0] if voices else "")
        if voice_id not in voices:
            return self._json(400, {"error": f"unknown voice '{voice_id}'"})

        try:
            scale = body.get("length_scale")
            scale = max(0.4, min(2.0, float(scale))) if scale is not None else None
            silence = max(0.0, min(2.0, float(body.get("sentence_silence", 0.0))))
            audio = synthesize(text, voice_id, scale, silence)
        except Exception as exc:  # report synthesis problems to the caller instead of dropping the connection
            return self._json(500, {"error": f"synthesis failed: {exc}"})
        self._send(200, audio, "audio/wav")


def main() -> None:
    parser = argparse.ArgumentParser(description="Local Piper TTS server")
    parser.add_argument("--port", type=int, default=5199)
    args = parser.parse_args()

    if not available_voices():
        sys.exit("No voices installed. Run: npm run tts:setup")

    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Piper TTS on http://127.0.0.1:{args.port} ({len(available_voices())} voice(s))", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
