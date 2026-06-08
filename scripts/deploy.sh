#!/usr/bin/env bash
#
# Build the site and publish it to the neighboring gridmix.github.io repo.
#
# Usage (from this repo's root):
#   pnpm run deploy
#
# It builds dist/, mirrors it into ../gridmix.github.io (removing stale build
# files but preserving that repo's metadata), then commits and pushes.

set -euo pipefail

TARGET="../gridmix.github.io"
SRC_SHA="$(git rev-parse --short HEAD)"

if [ ! -d "$TARGET/.git" ]; then
  echo "✗ Target repo not found at $TARGET" >&2
  echo "  Clone it next to this repo: git clone git@github.com:gridmix/gridmix.github.io.git" >&2
  exit 1
fi

echo "▶ Building…"
pnpm build

# Ensure GitHub Pages serves the dist as-is (no Jekyll processing).
touch dist/.nojekyll

echo "▶ Syncing dist/ → $TARGET …"
rsync -a --delete \
  --exclude='.git/' \
  --exclude='.gitignore' \
  --exclude='.idea/' \
  --exclude='.DS_Store' \
  --exclude='README.md' \
  --exclude='readme.md' \
  dist/ "$TARGET/"

echo "▶ Committing & pushing…"
git -C "$TARGET" add -A
if git -C "$TARGET" diff --cached --quiet; then
  echo "✓ No changes to deploy."
else
  git -C "$TARGET" commit -m "Deploy gridmix-website@${SRC_SHA}"
  git -C "$TARGET" push
  echo "✓ Deployed → https://gridmix.github.io/"
fi
