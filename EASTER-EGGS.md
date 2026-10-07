# Handi: easter eggs and hidden touches

Everything playful that is built into `public/index.html`, where to find it and how to make it
happen. This file lives outside `public/`, so it is never published with the site.

Code names in brackets are the functions or constants to look for in `public/index.html`.

## The cast

| Who | Pot | Cooks on | Details (at most two each) |
|---|---|---|---|
| Tamba Dada | The master pot (copper) | Never; he supervises | Spectacles, white moustache |
| Sona | Yellow Pot | Mon, Fri | A ladle |
| Chana Sahab | Black Pot | Tue | Heavy brows |
| Captain Neel | Blue Pot | Wed, Sat | A fish tail under the lid |
| Rani Rajma | Red Pot | Thu | A raised brow, a rajma bean on her cheek |
| Nawab Safed | White Pot | Sun | Bow tie, coriander sprig behind the ear, no nose |

The face formula that every pot follows is written as a comment above `potFace()`. Names,
backstories and quirks live in `CAST`.

## Hidden and playful things

### Faces that are alive
- **Blinking.** Today's hero pot, the six portraits on the Pots page and the logo blink about
  every 7 seconds. The tiny pot in the Today tab blinks on its own rhythm. *(`@keyframes blink`)*
- **Asleep at night.** From 10 pm to 5 am the hero pot's eyes close, its brows drop and "z z z"
  floats out of it. *(`asleep()`, `heroMood()`, `.pf.sleep`, `.pf-zzz`)*
- **Morning yawn.** Open the app between 5 and 10 am and the hero pot yawns once, a moment after
  the page loads. Once per page load. *(`heroMood()`, `.pf.yawn`)*
- **Poke a pot five times** (quickly, within about 1.5 seconds between taps) and it gets cross:
  the brows slant down and it says one line. Each tap gives a small nudge. Works on the hero pot,
  every Pots-page portrait, the pot in the "tomorrow's pot asks" card, the Before-bed card and
  the water line. *(`poke()`, `POKE`)*

  | Pot | Says |
  |---|---|
  | Tamba Dada | "Hm. Hm." |
  | Sona | "Yes?" |
  | Chana Sahab | "Hm." |
  | Captain Neel | "Mind the fish." |
  | Rani Rajma | "Darling. No." |
  | Nawab Safed | "One does not poke." |

- **The eyebrows track your day.** Each finished task lifts the hero pot's brows a little. At a
  full bowl the mouth becomes a tiny satisfied curve and the pot says its line.
  *(`.hero-art[data-n]`, `PF_SAYS`)*

  | Pot | Full-bowl line |
  |---|---|
  | Yellow | "Same time tomorrow." |
  | Black | "Acceptable." |
  | Blue | "The fish was not consulted." |
  | Red | "I would call that a triumph. Quietly." |
  | White | "Sunday best. As usual." |

### Tomorrow's pot asks for its soak
- **During the day**, if tomorrow's pot needs soaking (Black, Red, and White in winter), it shows
  up under the Next card and asks in its own words, with a "Soaked it" button. *(`askHTML()`, `ASK`)*
  - Chana Sahab: "I'm on tomorrow. Soak me."
  - Rani Rajma: "Tomorrow is my opening night. The beans need the whole night."
  - Nawab Safed: "Sunday needs its millet soaked. Tonight, if you please."
- **From 6 pm** the same pot speaks from inside the Before-bed card instead. *(`drawBed()`)*
  - After you soak, it thanks you: "Soaked. Acceptable." / "Soaked. I shall be magnificent." /
    "Soaked. Most civilised." *(`THANKS`)*
  - Pots with nothing to soak say so: Sona "No soak needed. Same time tomorrow."; Captain Neel
    "Nothing to soak. The fish is ready, unfortunately for the fish."; Nawab Safed "Nothing to
    soak. Sunday is sorted." *(`BED_SAY`)*
  - With everything ticked: "Sleep well. See you at breakfast."

### Water with character
- **Each glass you fill pours in**: the water spreads from the middle, the tumbler sloshes and a
  soft three-note glug plays. Un-ticking a glass is silent. *(`glug()`, `.pour`)*
- **At ten glasses** today's pot appears under the Water heading and says "Hydrated, apparently."

### The logo and the tabs
- **The logo is Tamba Dada**, the master pot. Tap him (or the word Handi) to jump back to Today.
  He tilts when you hover on a computer. He is also the favicon and the home-screen icon.
- **Each tab icon moves when you open its tab** *(`TI`, `tabWiggle()`)*:

  | Tab | Icon | When opened |
  |---|---|---|
  | Today | Today's pot, in today's colour | It blinks |
  | Cook | A pressure cooker | Two puffs of steam from the whistle |
  | Shop | A cloth jhola with a carrot peeking out | It swings |
  | Week | A three-tier steel tiffin (yellow, red, blue) | The lid hops |
  | Guide | A recipe notebook with a ladle as a bookmark | The page lines flip |
  | Pots | Two pots side by side | They bob, one after the other |

- **The red alert dot is a chilli**, and it gives a little shake every few seconds.
- **The Today tab's pot changes colour every day** to match the day's pot.
- **Keyboard (computer):** 1 to 6 switch tabs; 6 is Pots.

### The Pots page
- A card for each pot: name, role, days on duty, **how many times you have actually cooked it**
  (counted from the cook sheet's Finish button), its line, character, backstory and quirks.
- **The crew.** All 74 plants from the 30-plants list, numbered No. 01 to No. 74, each drawn as a
  character with dot eyes and a deadpan mouth. Ones you have collected are in colour; the rest
  are dashed outlines marked "not met yet". The grains have no face; they are shy.
  *(`renderPots()`, `stkFace()`)*
- **"See the whole crew"** in the sticker tin under the thali jumps to this sheet.

### Rewards that were already there
- **The bowl fills** in six layers as you finish tasks. A new layer ripples in; the full bowl
  steams, sparkles and throws a tadka burst. *(`drawBowl()`)*
- **The surprise lid.** Finish the day and a pot appears with its lid rattling. Tap to open: a
  chef's tip, a plant fact, or a new sticker for the tin. Tips and facts do not repeat until all
  have been seen. *(`surprise()`, `TIPS`, `FACTS`)*
- **Finishing a recipe** in the cook sheet plays a tadka burst of sparks and steam with a quiet
  sizzle. *(`tadka()`, `sizzle()`)*
- **Ticking anything** pops the box and drops a few bits of food into it. *(`plop()`)*
- **Rescues.** Say you forgot to soak and pick a fix: the pot appears wearing a lifebuoy, the toast
  calls it a win, and that day's katori on the thali gets a red star.
- **The weekly thali.** Each finished day lands a katori, with that pot's face, on a steel plate.
  On Sunday it moves to the top as "The meal you ate this week".
- **A note from earlier you.** In the morning, a taped note thanks you for last night's before-bed
  ticks, on Monday for Sunday prep and on Friday for the Thursday top-up. Rows that benefit
  show a "Prepped" badge.
- **Black Pot looked everywhere.** Search the shop list for something that isn't there and Black
  Pot shows up, having looked.
- **Black Pot watches the reset buttons** in Settings, next to "Start over".
- **The family portrait.** Guide, then How to use: all five pots in a row.

## How to see the time-based ones
- Night (10 pm to 5 am) and the morning yawn (5 to 10 am) follow your phone's clock.
- The soak ask appears on Monday, Wednesday and (November to February) Saturday: the days before
  the Black, Red and White Pots, which need soaking.
- Settings has "Reset today" if you want to tick through a day again.
