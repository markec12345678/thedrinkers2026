import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show login option", async ({ page }) => {
    const loginButton = page.locator(
      'a[href*="login"], button:has-text("Login"), button:has-text("Sign In")',
    );
    await expect(loginButton.first()).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    const loginButton = page.locator(
      'a[href*="login"], button:has-text("Login"), button:has-text("Sign In")',
    );
    await loginButton.first().click();

    // Should redirect to login page or show login modal
    await expect(page).toHaveURL(/.*\/login|.*\/auth/);
  });
});
