#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

HUGO_BIN="${HUGO_BIN:-$HOME/.local/bin/hugo-0.114.0}"
if [ ! -x "$HUGO_BIN" ]; then
  echo "Hugo 0.114.0 is required. Set HUGO_BIN to a compatible Hugo executable." >&2
  exit 1
fi

exec "$HUGO_BIN" server --bind 127.0.0.1 --port "${PORT:-1313}" --navigateToChanged "$@"
