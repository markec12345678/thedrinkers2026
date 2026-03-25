import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/The Drinkers/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should have navigation menu", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("should have hero section", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });
});
