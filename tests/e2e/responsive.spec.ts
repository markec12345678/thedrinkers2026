import { test, expect } from "@playwright/test";

test.describe("Mobile Responsiveness", () => {
  test("should render correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("/");

    await expect(page.locator("body")).toBeVisible();

    // Check if mobile menu exists or navigation is accessible
    const mobileMenu = page.locator(
      '[data-mobile-menu], button[aria-label*="menu"], .mobile-menu',
    );
    if ((await mobileMenu.count()) > 0) {
      await expect(mobileMenu.first()).toBeVisible();
    }
  });

  test("should render correctly on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto("/");

    await expect(page.locator("body")).toBeVisible();
  });

  test("should render correctly on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    await expect(page.locator("body")).toBeVisible();
  });
});
