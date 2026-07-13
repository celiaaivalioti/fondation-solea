#!/usr/bin/env bash
# Push main to GitHub and watch the "Deploy to Infomaniak" workflow until the
# preview site is updated. Usage: npm run deploy
set -euo pipefail

cd "$(dirname "$0")/.."

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
  echo "You are on branch '$branch'. Switch to main before deploying." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "You have uncommitted changes. Commit them first, then run npm run deploy again." >&2
  git status --short
  exit 1
fi

if ! command -v gh >/dev/null; then
  echo "The GitHub CLI (gh) is required to watch the deployment. Install it with: brew install gh" >&2
  exit 1
fi

git push origin main
head_sha=$(git rev-parse HEAD)

echo "Waiting for the deployment workflow to start for $head_sha…"
run_id=""
for _ in $(seq 1 15); do
  # "|| true": right after the workflow file is first pushed, GitHub may not
  # have registered it yet — keep polling instead of aborting.
  run_id=$(gh run list --workflow deploy.yml --branch main \
    --json databaseId,headSha --jq ".[] | select(.headSha == \"$head_sha\") | .databaseId" \
    --limit 10 2>/dev/null | head -n 1 || true)
  if [ -n "$run_id" ]; then
    break
  fi
  sleep 3
done

if [ -z "$run_id" ]; then
  echo "Could not find a workflow run for this commit. Check https://github.com/celiaaivalioti/fondation-solea/actions" >&2
  exit 1
fi

if gh run watch "$run_id" --exit-status; then
  echo ""
  echo "✅ Deployed: https://preview.fondation-solea.ch"
else
  echo ""
  echo "❌ Deployment failed. Log of the failing step:" >&2
  gh run view "$run_id" --log-failed >&2
  exit 1
fi
