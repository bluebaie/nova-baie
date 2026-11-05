import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://localhost:3146', browserName: 'chromium', channel: 'chrome', headless: true, locale: 'fr-FR' },
  webServer: { command: 'node scripts/start-test-server.mjs', url: 'http://localhost:3146/robots.txt', reuseExistingServer: false, timeout: 180_000 },
});
