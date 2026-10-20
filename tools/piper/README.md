# Local Piper TTS (optional)

Higher-quality, offline, consistent speech for the study app. The app uses it automatically when installed and **falls back to your browser's voices when it is not** (or if it stops responding).

[Piper](https://github.com/OHF-Voice/piper1-gpl) is a fast neural text-to-speech engine that runs on the CPU. Only the voices you install are downloaded (about 60 MB each for `medium` quality).

## Install

```sh
npm run tts:setup                          # Piper + one English voice (en_US-lessac-medium)
npm run tts:setup -- en_GB-alan-medium     # add another voice later
```

Needs Python 3.9+ and internet access for the one-time download. Then restart `npm start`. The player settings show which engine is in use.

Behind a corporate proxy that re-signs TLS (pip or curl fail with `CERTIFICATE_VERIFY_FAILED`): export your company root certificate as a `.pem` file and run `CA_BUNDLE=/path/to/root.pem npm run tts:setup`.

## How it works

```
Browser ──/api/tts/speak──> Node server (app/server.js) ──> tools/piper/server.py ──> Piper + voice model
        └─ if unavailable ─> browser speech synthesis
```

- `app/server.js` starts `server.py` on `127.0.0.1:5199` when `.venv` and at least one voice exist (`PIPER_PORT` to change, `TTS=off` to disable).
- `server.py` is plain standard-library Python; models are loaded on first use.
- Files here: `setup.sh` (installer), `server.py`, `requirements.txt`. Git ignores `.venv/` and `voices/`.

## Voices

Voice ids look like `en_US-lessac-medium` (`<language_REGION>-<name>-<quality>`). Browse https://huggingface.co/rhasspy/piper-voices. The questions are in English, so English voices are enough; install another language only if you want to hear samples in it.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Settings say "Piper not installed" | Run `npm run tts:setup`, restart `npm start` |
| "Piper installed but not responding" | Look at the terminal running `npm start` for the error from `server.py` |
| Port in use | `PIPER_PORT=5300 npm start` |
| First sentence is slow | The model loads on first use (about a second); later sentences are fast |
