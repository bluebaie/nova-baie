import { defineConfig } from '@playwright/test';

const port = process.env.PLAYWRIGHT_PORT ?? '3146';

export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1,
  use: { baseURL: `http://localhost:${port}`, browserName: 'chromium', channel: 'chrome', headless: true, locale: 'fr-FR' },
  webServer: { command: 'node scripts/start-test-server.mjs', url: `http://localhost:${port}/robots.txt`, reuseExistingServer: false, timeout: 180_000 },
});
