require('dotenv').config();
const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: process.env.TEST_NAME,
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });
});
