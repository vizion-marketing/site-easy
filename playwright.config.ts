import { defineConfig, devices } from "@playwright/test";

/**
 * Config Playwright pour easyvirtual.tours (Astro 6).
 * Lance automatiquement le serveur Astro avant les tests.
 * Docs : https://playwright.dev/docs/test-configuration
 */
const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  // Échec si un `test.only` est resté dans le code commité.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Parallélisme : 1 worker en CI pour la stabilité, sinon auto.
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  // Démarre le serveur Astro avant la suite et le réutilise en local.
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
