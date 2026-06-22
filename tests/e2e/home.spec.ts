import { test, expect } from "@playwright/test";

test("la page d'accueil se charge", async ({ page }) => {
  await page.goto("/");
  // La page répond et a un titre non vide.
  await expect(page).toHaveTitle(/.+/);
});
