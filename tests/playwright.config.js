// @ts-check
const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 30_000,
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: {baseURL: 'http://localhost:4173', viewport: {width: 400, height: 860}},
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome'], viewport: {width: 400, height: 860}}}],
  webServer: {command: 'node serve.mjs', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI},
});
