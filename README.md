# Handi

One pot a day. A static web app in `public/`: plain HTML, CSS and JavaScript files.
There is no build step, nothing to install and no server code.

**Live:** https://handi.red-hill-7020.workers.dev/ (built from `main`)

## Files

```
public/                  everything the site serves
  index.html             page structure only
  css/                   loaded in this order; later files win
    fonts.css tokens.css base.css today.css cook.css shop.css week.css guide.css
    cook-sheet.css timers.css settings.css desktop.css design.css motion-and-print.css
  js/                    plain scripts, loaded in order; they share one global scope
    data.js              recipes, shopping, seasons, plants (content, not code)
    state.js             the saved data (localStorage key graytee.v2)
    art.js cast.js       drawings: katoris, stickers, the pot faces (potFace)
    today.js rewards.js  Today, the bowl, thali, notes, rescues, the surprise
    cook.js feel.js timers.js shop.js week.js
    family.js            tab icons, the Pots page, moods, water, tomorrow's pot
    app.js start.js      navigation, events, start-up
  fonts/ icons/          font and icon files
  manifest.webmanifest   home-screen app details
  _headers               cache rules (fonts kept for a year)
tests/                   browser tests and a local server (not published)
CLAUDE.md                how to change the app: structure, design language, a worked example
EASTER-EGGS.md           every hidden touch and how to trigger it (not published)
gray-tee-food-system.before-handi.html   the original version, kept for reference
```

If a font ever changes, give it a new file name: phones keep fonts for a year.

## Run it locally

```
cd tests
npm install            # once
node serve.mjs         # http://localhost:4173
npx playwright test    # 18 browser tests
```

## How changes go live

1. Commit to `main` and push.
2. GitHub runs the browser tests (**Tests** check) and Cloudflare publishes `public/`
   (**Workers Builds: handi** check). The live site updates about a minute later.

There are no preview links: only `main` is built.

## Cloudflare setup

The site is a Cloudflare **Worker with static assets** (not a Pages project). It serves
files only, which is free.

Dashboard: **Workers & Pages → handi → Settings**

| Setting | Value |
|---|---|
| Builds → Git repository | `rohitdotonl/handi` |
| Builds → Production branch | `main` |
| Builds → Build command | empty |
| Builds → Deploy command | `npx wrangler deploy` (the default) |
| Builds → Builds for non-production branches | **off** |
| Builds → Root directory | `/` |
| Domains & Routes → Preview URLs | **off** |

### `wrangler.jsonc`

The settings that matter live in the repo and override anything Cloudflare generated:

- `"assets": { "directory": "./public" }`: only `public/` is published. Do not point
  this at the repo root: that publishes `.git` and lets anyone download the repo.
- `"name": "handi"`: must match the Worker's name in Cloudflare.

Anything that should be public goes in `public/`. Anything else (notes, tests, old
versions, this README) stays outside it.

## Saved data

Progress is saved in the browser on each device (`localStorage`, key `graytee.v2`).
There is no account or server copy.

- Changing the live URL (a new project or domain) starts everyone fresh.
- Use the app from the **home screen** (Add to Home Screen). On iPhone, Safari can delete
  a website's data after about 7 days without a visit; home-screen apps are exempt.
- Clearing browser data or changing phones loses progress.

## Troubleshooting

| Symptom | Fix |
|---|---|
| The live site didn't update | Check the **Workers Builds: handi** check on the commit; use Retry on the build in Cloudflare. |
| A **Tests** check failed | Open it on GitHub; run `npx playwright test` in `tests/` to reproduce. |
| Repo files (e.g. `/.git/HEAD`) load on the live site | `assets.directory` is wrong; it must be `./public`. |
| A branch push started a preview build | Turn off **Builds for non-production branches** (Settings → Builds). |
