// Behaviour tests for Handi. They drive the real app in Chromium with a fixed clock and a
// seeded save (the same localStorage key the live app uses), and fail on any console error.
const {test, expect} = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const KEY = 'graytee.v2';
const fixture = name => fs.readFileSync(path.join(__dirname, 'fixtures', name + '.json'), 'utf8');
/* times are India Standard Time, where the app is used */
const ist = local => Date.parse(local + '+05:30');
const TABS = ['today', 'cook', 'shop', 'week', 'guide', 'cast'];

/** Open the app at a given local time with a given save. Returns the list of page errors. */
async function open(page, {at = '2026-10-07T13:30:00', state, tab = 'today', scheme = 'light'} = {}) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.emulateMedia({colorScheme: scheme});
  await page.clock.setFixedTime(ist(at));
  if (state) {
    await page.addInitScript(([key, s]) => {
      if (!sessionStorage.getItem('seeded')) { sessionStorage.setItem('seeded', '1'); localStorage.setItem(key, s); }
    }, [KEY, state]);
  }
  await page.goto('/#' + tab);
  await expect(page.locator('#' + tab)).toBeVisible();
  return errors;
}
const saved = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);

test.use({timezoneId: 'Asia/Kolkata'});

test.describe('every tab', () => {
  for (const scheme of ['light', 'dark']) {
    test(`loads cleanly in ${scheme}`, async ({page}) => {
      const errors = await open(page, {state: fixture('wednesday'), scheme});
      for (const tab of TABS) {
        await page.click(`.tabs [data-tab="${tab}"]`);
        await expect(page.locator('#' + tab)).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }

  test('never scrolls sideways on a small phone', async ({page}) => {
    await page.setViewportSize({width: 360, height: 780});
    await open(page, {state: fixture('wednesday')});
    for (const tab of TABS) {
      await page.click(`.tabs [data-tab="${tab}"]`);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, `${tab} overflows`).toBeLessThanOrEqual(0);
    }
  });

  test('has six drawn tab icons, and keys 1 to 6 switch tabs', async ({page}) => {
    await open(page, {state: fixture('wednesday')});
    await expect(page.locator('.tabs svg.ti')).toHaveCount(6);
    for (const [k, tab] of TABS.entries()) {
      await page.keyboard.press(String(k + 1));
      await expect(page.locator('#' + tab)).toBeVisible();
    }
  });

  test('loads its own fonts, never a silent fallback', async ({page}) => {
    await open(page, {state: fixture('wednesday')});
    const loaded = await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(['700 20px "Bricolage Grotesque"', '400 16px "IBM Plex Sans"', '400 14px "JetBrains Mono"'].map(f => document.fonts.load(f)));
      return [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')))].sort();
    });
    expect(loaded).toEqual(['Bricolage Grotesque', 'IBM Plex Sans', 'JetBrains Mono']);
  });

  test('the logo goes back to Today', async ({page}) => {
    await open(page, {state: fixture('wednesday'), tab: 'shop'});
    await page.click('.brand');
    await expect(page.locator('#today')).toBeVisible();
  });
});

test.describe('saved data', () => {
  test('keeps working with an existing save, theme included', async ({page}) => {
    const state = JSON.parse(fixture('wednesday'));
    state.theme = 'catppuccin';
    await open(page, {state: JSON.stringify(state)});
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'catppuccin');
    await expect(page.locator('.dprog b')).toHaveText('3');
    expect((await saved(page)).stk).toEqual(['moringa', 'guava', 'mung']);
  });
});

test.describe('Today', () => {
  test('the bowl fills, the day finishes, a katori lands and the surprise stays open', async ({page}) => {
    const errors = await open(page, {at: '2026-10-07T16:00:00', state: JSON.stringify({intro: 1})});
    await expect(page.locator('svg.bowl')).toHaveAttribute('data-n', '0');
    for (let i = 0; i < 12; i++) {
      const tick = page.locator('#tl li:not(.done) .tick').first();
      if (!(await tick.count())) break;
      await tick.click();
    }
    await expect(page.locator('svg.bowl')).toHaveAttribute('data-n', '6');
    await expect(page.locator('.thali .tk')).toHaveCount(1);
    await page.click('[data-surprise]');
    await expect(page.locator('.reveal.open')).toBeVisible();
    await page.reload();
    await expect(page.locator('.reveal.open')).toBeVisible();
    expect((await saved(page)).surprise.open).toBe(1);
    expect(errors).toEqual([]);
  });

  test('a forgotten soak is rescued, and the rescue is remembered', async ({page}) => {
    await open(page, {at: '2026-10-08T08:00:00', state: fixture('thursday-unsoaked')});
    await page.click('[data-soak="no"]');
    await expect(page.locator('.focus.rescue-ask')).toBeVisible();
    await page.click('[data-fix="swap"]');
    await expect(page.locator('.fixnote.rescued')).toContainText('Day rescued');
    expect((await saved(page)).rescued['2026-10-8']).toBe('swap');
  });

  test('Monday morning has a note from earlier you and Prepped badges', async ({page}) => {
    await open(page, {at: '2026-10-12T08:10:00', state: fixture('monday-morning')});
    await expect(page.locator('.ynote')).toContainText('Last night you set out the cooker');
    await expect(page.locator('.ynote')).toContainText('On Sunday you boiled 12 eggs');
    await expect(page.locator('.pbadge').first()).toBeVisible();
  });

  test('on Sunday the week’s meal moves to the top', async ({page}) => {
    await open(page, {at: '2026-10-11T21:00:00', state: fixture('sunday')});
    await expect(page.locator('.tcol.a .thali h2')).toHaveText('The meal you ate this week');
    await expect(page.locator('.thali .tk')).toHaveCount(6);
  });

  test('tomorrow’s pot asks for its soak, then speaks from the Before bed card', async ({page}) => {
    await open(page, {at: '2026-10-07T13:30:00', state: fixture('wednesday')});
    await expect(page.locator('.askpot')).toContainText('Rani Rajma');
    const evening = await page.context().newPage();
    await open(evening, {at: '2026-10-07T19:30:00', state: fixture('wednesday')});
    await expect(evening.locator('.askpot')).toHaveCount(0);
    await expect(evening.locator('.bedsay')).toContainText('opening night');
  });

  test('the pot sleeps at night', async ({page}) => {
    await open(page, {at: '2026-10-07T23:10:00', state: fixture('wednesday')});
    await expect(page.locator('.hero-art .pf')).toHaveClass(/sleep/);
  });

  test('poking a pot five times makes it cross', async ({page}) => {
    await open(page, {state: fixture('wednesday')});
    const face = page.locator('.hero-art svg.pf');
    for (let i = 0; i < 5; i++) await face.click();
    await expect(face).toHaveClass(/cross/);
    await expect(page.locator('.hero-art .pokeq')).toHaveText('“Mind the fish.”');
  });

  test('ten glasses of water gets an opinion', async ({page}) => {
    await open(page, {state: fixture('wednesday')});
    await page.click('[data-wset="10"]');
    await expect(page.locator('.wsays')).toContainText('Hydrated, apparently.');
    expect((await saved(page)).day.water).toBe(10);
  });
});

test.describe('Cook', () => {
  test('cooking a pot to the end counts it on the Pots page', async ({page}) => {
    await open(page, {state: fixture('wednesday'), tab: 'cook'});
    await page.click('#cook [data-rec="pot:yellow"]');
    await expect(page.locator('#sheet')).toBeVisible();
    for (let i = 0; i < 40 && await page.locator('#sheet').isVisible(); i++) await page.click('#sh-next');
    await expect(page.locator('#sheet')).toBeHidden();
    expect((await saved(page)).cooked['pot:yellow']).toBe(1);
    await page.click('.tabs [data-tab="cast"]');
    await expect(page.locator('#cast-yellow')).toContainText('1 time');
  });
});

test.describe('Pots', () => {
  test('shows the six characters and the whole crew', async ({page}) => {
    await open(page, {state: fixture('wednesday'), tab: 'cast'});
    await expect(page.locator('.castc')).toHaveCount(6);
    await expect(page.locator('ol.crew li')).toHaveCount(74);
    await expect(page.locator('ol.crew li.got')).toHaveCount(3);
  });

  test('the sticker tin links to the crew', async ({page}) => {
    await open(page, {state: fixture('wednesday')});
    await page.click('[data-crew]');
    await expect(page.locator('#cast')).toBeVisible();
  });
});
