import { describe, it, expect } from "vitest";

describe("Utils", () => {
  it("should have valid test setup", () => {
    expect(true).toBe(true);
  });

  it("should verify environment variables", () => {
    expect(process.env.NEXT_PUBLIC_SITE_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_SITE_NAME).toBe("The Drinkers");
  });
});
