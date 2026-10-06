# Handi

One pot a day. A single-file web app: everything lives in `public/index.html`.
There is no build step and no server code.

## Links

| | URL | Branch |
|---|---|---|
| Live | https://handi.red-hill-7020.workers.dev/ | `main` |
| Preview | `https://<branch>-handi.red-hill-7020.workers.dev/` | any other branch |

In a preview link, slashes in the branch name become dashes:
`design/steel-and-tadka` → https://design-steel-and-tadka-handi.red-hill-7020.workers.dev/

## How changes go live

1. Work happens on a branch, never straight on `main`.
2. Pushing the branch builds a preview link in about a minute.
3. Try the preview on your phone.
4. Merge the branch into `main` on GitHub; the live site updates about a minute later.

Build status shows as the **Workers Builds: handi** check on each commit in GitHub,
with a link to the build log in Cloudflare.

## Cloudflare setup

The site is a Cloudflare **Worker with static assets** (not a Pages project; Cloudflare
now steers new projects to Workers). It serves files only, which is free.

Dashboard: **Workers & Pages → handi → Settings → Builds**

| Setting | Value |
|---|---|
| Git repository | `rohitdotonl/handi` |
| Production branch | `main` |
| Build command | empty |
| Deploy command (Production tab) | `npx wrangler deploy` (the default) |
| Builds for Preview branches | on |
| Preview command (Previews Base tab) | `npx wrangler preview` |
| Root directory | `/` |

### `wrangler.jsonc`

The settings that matter live in the repo, in `wrangler.jsonc`, and override anything
Cloudflare generated:

- `"assets": { "directory": "./public" }`: only `public/` is published. Do not point
  this at the repo root: that publishes `.git` and lets anyone download the repo.
- `"previews": {}`: required by `npx wrangler preview`. It can stay empty.
- `"name": "handi"`: must match the Worker's name in Cloudflare.

Anything that should be public goes in `public/`. Anything else (notes, old versions,
this README) stays outside it.

## Saved data

Progress is saved in the browser on each device (`localStorage`, key `graytee.v2`).
There is no account or server copy.

- Each link has its own storage, so preview links start empty and never touch live data.
- Changing the live URL (a new project or domain) starts everyone fresh.
- Use the app from the **home screen** (Add to Home Screen). On iPhone, Safari can delete
  a website's data after about 7 days without a visit; home-screen apps are exempt.
- Clearing browser data or changing phones loses progress.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Preview build fails: "missing a `previews` block" | Keep `"previews": {}` in `wrangler.jsonc`. |
| Preview link returns 404 | The branch build failed or hasn't run; check the GitHub check or Cloudflare Deployments. |
| Repo files (e.g. `/.git/HEAD`) load on the live site | `assets.directory` is wrong; it must be `./public`. |
| A build didn't start | Push a new commit, or use Retry on the build in Cloudflare. |
