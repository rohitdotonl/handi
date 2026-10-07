# Working on Handi

Read this before changing anything. It explains what the app is for, how it is built, how it
looks and talks, and how to make a typical change (adding a food) without breaking any of it.

## What Handi is

A phone-first kitchen companion for one person who cooks **one Indian pressure-cooker pot a day**
and eats it for lunch and dinner. Five pots rotate through the week by colour:

| Day | Sun | Mon | Tue | Wed | Thu | Fri | Sat |
|---|---|---|---|---|---|---|---|
| Pot | White | Yellow | Black | Blue | Red | Yellow | Blue |

Today tells you what to do next; Cook walks through recipes step by step; Shop holds the lists;
Week has prep, the plan and the 30-plants count; Guide explains things; Pots introduces the cast.

The emotional rules matter as much as the code:
- **Forgiving, never punishing.** No streaks to break. A missed day is an empty spot on the thali,
  not a failure. A forgotten soak is a *rescue*, and rescues are celebrated.
- **Earlier effort pays off visibly.** Before-bed ticks and Sunday prep come back as a "note from
  earlier you" and "Prepped" badges.
- **Rewards you can see.** The bowl fills, a katori lands on the thali, a lid opens on a surprise.
- **Easy at a glance.** The next thing to do is always obvious. Fun never gets in the way of that.

## Ground rules

- **No build step.** `public/` is published as-is to Cloudflare. Plain HTML, CSS and JS.
- **Scripts are classic scripts loaded in order** (see the end of `index.html`). They share one
  global scope: a `const` in `data.js` is visible in `today.js`. Keep names unique across files.
  Put new code in the file it belongs to; put definitions before the files that use them at load.
- **CSS loads in the order listed in `index.html`; later files win.** Component files first,
  then `design.css` (the look), then `motion-and-print.css`. Colours come only from tokens in
  `tokens.css`, never a raw hex in a component rule (food art inside SVGs is the exception).
- **Saved data is sacred.** Everything lives in `localStorage` under the key `graytee.v2`
  (`state.js`). Ids are stored in it: shopping ticks (`mem.w`, `mem.m`) by item `id`, plants
  (`mem.p`) and stickers (`mem.stk`) by plant id, cooked counts by `pot:<colour>`. **Never rename
  or reuse an id.** Add new ids; if you must change the shape of saved data, migrate old saves at
  start-up in `state.js`. Theme values stay `lupine` (light) and `catppuccin` (dark).
- **Both themes, phone first.** Check light and dark, 400 px and 1280 px. No sideways scroll,
  44 px tap targets, body text contrast at least 4.5:1, `prefers-reduced-motion` turns motion off.

## Where things live

| You want to change | File |
|---|---|
| Recipes: the five pots, "something else", snacks and pickle, extras | `js/data.js` (`POTS`, `BORED`, `SIDES`, `EXTRAS`) |
| Weekly and monthly shopping lists | `js/data.js` (`WEEKLY`, `MONTHLY`); Hindi names in `js/shop.js` (`AKA`) |
| What's in season each month | `js/data.js` (`SEASON`) |
| The 30-plants list (also the sticker crew) | `js/data.js` (`PLANTS`) |
| The day's tasks and their times | `js/today.js` (`buildRows`) |
| Before-bed checklist | `js/today.js` (`drawBed`) |
| Sunday prep and Thursday top-up steps | `js/week.js` (`SUN`, `THU`) |
| What prep makes a row "Prepped", and how the note words it | `js/rewards.js` (`PREP_FOR`, `SUN_DID`, `THU_DID`) |
| Chef's tips and plant facts in the surprise | `js/rewards.js` (`TIPS`, `FACTS`) |
| Food icons in task rows | `js/rewards.js` (`ROWICON`) using katori art from `js/art.js` (`KI`) |
| Ingredient stickers and their faces | `js/cast.js` (`STK`, `STK_SHAPE`, `STK_AT`) |
| The pot faces | `js/cast.js` (`PF`, `PF_DET`, `potFace`, `PF_SAYS`) |
| The bowl's six layers | `js/cast.js` (`bowlArt`, `LAYERS`) |
| The cast's names, backstories, lines; tab icons; moods; water | `js/family.js` (`CAST`, `POKE`, `ASK`, `TI`) |
| Navigation, clicks, keyboard | `js/app.js` |
| Hidden touches (keep this list current) | `EASTER-EGGS.md` |

## The design language

**Print, by one hand.** Everything looks risograph-printed: flat inks, a slightly wobbly key line
(the SVG filter `#pf-wob`), the colour layer nudged about 1 px off the line layer, halftone dots for
shading. Halftone and grain live only inside drawings, never behind text.

**Four inks and paper.** `--k` (black line), `--ink-b` (blue), `--ink-r` (red), `--ink-y` (yellow);
green `--ink-g` stands in for blue over yellow. Pots use `--pot-<colour>`; the master pot is
`--pot-master` (copper, red over yellow). Every colour has a light and a dark value in `tokens.css`.

**The face formula** (written out above `potFace` in `cast.js`; never break it): a steel handi seen
straight on, two dot eyes, one nose stroke or none, a short deadpan mouth, brows where the
personality lives, **at most two telling details** per character. Stickers follow the same idea:
die-cut shape, colour plate, two dots and a deadpan line (`STK_AT` places the face).

**Voice.** Plain, short instructions; real quantities in grams and spoons. The cast speaks rarely,
one line at a time, and is **deadpan, never cutesy**: "Acceptable." "The fish was not consulted."
No emoji as icons, no exclamation marks, no guilt.

**Motion.** Small and physical: a pop on tick, a layer dropping into the bowl, a lid lifting. One
moment per action, never constant bouncing. Everything respects reduced motion.

## Worked example: adding sprouts

Say you want **sprouted mung (ankurit moong)** to replace roasted chickpeas in the afternoon snack.
Think through each place a food touches, in this order:

1. **The task.** In `today.js` → `buildRows`, the `snack` row's first item becomes, for example,
   `'A small bowl (80 g) of sprouted mung, with lemon, salt and chopped onion'`. Keep the
   quantity and the plain style.
2. **Shopping.** Sprouts come from whole mung, so in `data.js` → `MONTHLY` add an item with a
   **new id**, for example `{id:'wmung',n:'Whole mung beans (for sprouting)',q:'500 g',s:'...',t:'All year.'}`.
   Don't reuse `mung` (that's the split dal, and saved ticks are keyed by id). Add the Hindi
   name to `AKA` in `shop.js`: `wmung:'sabut moong'`.
3. **Prep, the fun part.** Sprouting takes two days: soak overnight, then rinse twice a day.
   - Add a Sunday prep step in `week.js` → `SUN` ("Soak 100 g whole mung for sprouts").
   - Give it a past-tense phrase in `SUN_DID` ("started the sprouts").
   - Map it in `PREP_FOR` so the snack row shows **Prepped** on Monday to Thursday.
   - If it needs a daily rinse, add a before-bed item in `drawBed`. The note from earlier you
     will then thank you for it the next morning automatically.
4. **The 30 plants.** Sprouted mung is still mung, so it **does not** add a plant (the rule is one
   point per plant species). If you add a genuinely new plant, add it to `PLANTS` with a new id.
   That also adds it to the crew on the Pots page, so give it a sticker (next step) and update the
   crew count in `tests/app.spec.js` (74 today).
5. **Sticker and row icon.** A new sticker means an entry in `STK` (`shape` and colour). If no
   existing shape fits (a sprout is a bean with a little tail), add a shape to `STK_SHAPE` in the
   24 x 24 box and a face position to `STK_AT`. Keep it one colour plate, flat, die-cut.
   For a task-row icon, add a katori in `art.js` → `KI` and map the row id in `ROWICON`.
6. **A little delight (optional, one only).** A plant fact in `FACTS` ("Mung sprouts grow about
   a centimetre a day...") or a tip in `TIPS`. Or a single deadpan line from a pot. Don't add more
   than one new joke per change; restraint keeps the cast funny.
7. **Copy check.** Read every new string aloud. Plain, specific, no exclamation marks.
8. **Verify.** Run the tests (below), then look at Today and Shop in light and dark at phone and
   desktop width. If you added a hidden touch, add it to `EASTER-EGGS.md`.

The same walk-through covers swapping a vegetable in a pot (`POTS[colour].ing`, `steps`, `line`,
`swaps`), adding a fruit (`SEASON`, `PLANTS`, `STK`), or adding a snack recipe (`SIDES`).

## Bigger changes, in brief

- **A new pot or recipe colour:** `POTS` and `ROTA` in `data.js`; a `--pot-<name>` token (light
  and dark) in `tokens.css`; a face in `PF` (two details at most); a `CAST` entry with name, story
  and quirks; `ASK`/`THANKS`/`BED_SAY` if it needs soaking; `LAYERS` and the bowl ingredients.
- **A new tab:** a button in the nav and a `<section class="page">` in `index.html`, its id in
  `TABS` in `app.js` (ids must not clash with other element ids), a drawn icon in `TI`, keyboard
  shortcut text in Guide, and a line in the Guide's tab list.
- **New saved data:** add the key with a default in `state.js`; never assume it exists in old saves.

## Checking your work

```
cd tests
npm install            # once
node serve.mjs         # the app on http://localhost:4173
npx playwright test    # 18 browser tests; also run by GitHub on every push
```

The tests seed real saves (`tests/fixtures/`) and fix the clock, so time-of-day features
(morning note, night, before bed) can be tested. Add a test for anything new that matters.

## Shipping

Commit to `main` and push. Cloudflare publishes `public/` to https://handi.red-hill-7020.workers.dev/
in about a minute; GitHub runs the tests. There are no preview branches.
