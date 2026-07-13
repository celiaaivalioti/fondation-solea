#!/usr/bin/env bash
# Runs ON the Infomaniak Node.js hosting. Uploaded and executed by
# .github/workflows/deploy.yml — not meant to be run locally.
set -euo pipefail

cd /srv/customer/sites/preview.fondation-solea.ch

# First deploy: the directory may exist without being a git clone.
# git reset --hard keeps untracked files (.env.local, node_modules).
if [ ! -d .git ]; then
  git init -q -b main
  git remote add origin https://github.com/celiaaivalioti/fondation-solea.git
fi

git fetch --quiet origin main
git reset --quiet --hard origin/main
echo "Checked out $(git rev-parse --short HEAD)"

npm ci --no-audit --no-fund --loglevel=error
npm run build

# Infomaniak supervises the Node process and restarts it if it exits,
# so killing it is how we pick up the new build.
pkill -f "next start" || true
echo "Deploy finished: new build is live once the Node process restarts."
