const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Test Mc Tester",
        username: "mctester",
        password: "das2!dkcoR",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });
});
