#!/usr/bin/env sh
# Installs Piper into ./.venv and downloads ONLY the voices you ask for (default: one English voice).
#
#   sh tools/piper/setup.sh                       # en_US-lessac-medium
#   sh tools/piper/setup.sh en_GB-alan-medium     # add another voice (safe to re-run; skips what exists)
#   CA_BUNDLE=/path/to/corp-root.pem sh tools/piper/setup.sh   # behind a TLS-inspecting proxy
#
# Browse voices: https://huggingface.co/rhasspy/piper-voices  (id = <lang_REGION>-<name>-<quality>)
set -eu
cd "$(dirname "$0")"

PYTHON="${PYTHON:-python3}"
BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main"
VOICES="${*:-en_US-lessac-medium}"

if [ -n "${CA_BUNDLE:-}" ]; then
  export PIP_CERT="$CA_BUNDLE" SSL_CERT_FILE="$CA_BUNDLE" CURL_CA_BUNDLE="$CA_BUNDLE" REQUESTS_CA_BUNDLE="$CA_BUNDLE"
fi

command -v "$PYTHON" >/dev/null 2>&1 || { echo "Python 3 not found (set PYTHON=/path/to/python3)"; exit 1; }

if [ ! -x .venv/bin/python ]; then
  echo "Creating virtual environment in tools/piper/.venv"
  "$PYTHON" -m venv .venv
fi
echo "Installing piper-tts"
.venv/bin/python -m pip install --quiet -r requirements.txt

mkdir -p voices
for id in $VOICES; do
  # en_US-lessac-medium -> en/en_US/lessac/medium/en_US-lessac-medium
  region="${id%%-*}"; rest="${id#*-}"; name="${rest%-*}"; quality="${rest##*-}"; lang="${region%%_*}"
  path="$lang/$region/$name/$quality/$id"
  if [ -f "voices/$id.onnx" ] && [ -f "voices/$id.onnx.json" ]; then
    echo "Voice $id already installed"
    continue
  fi
  echo "Downloading voice $id"
  curl -fL --progress-bar "$BASE/$path.onnx.json" -o "voices/$id.onnx.json.part" && mv "voices/$id.onnx.json.part" "voices/$id.onnx.json"
  curl -fL --progress-bar "$BASE/$path.onnx" -o "voices/$id.onnx.part" && mv "voices/$id.onnx.part" "voices/$id.onnx"
done

echo "Done. Installed voices:"; ls voices | sed -n 's/\.onnx$//p'
echo "Restart the app (npm start); it will use Piper automatically."
