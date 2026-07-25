#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

git diff --check
npm test
npm run check
npm run build

echo "verify: EmilFreijd checks passed"
