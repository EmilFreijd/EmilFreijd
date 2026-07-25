#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

node_major="$(node --version | sed -E 's/^v([0-9]+).*/\1/')"
if [ "$node_major" != "22" ]; then
  echo "bootstrap: Node 22 krävs, hittade $(node --version)" >&2
  exit 1
fi

npm ci

echo "bootstrap: EmilFreijd är redo"
