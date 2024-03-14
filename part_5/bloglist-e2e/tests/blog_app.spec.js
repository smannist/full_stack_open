require("dotenv").config();
const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: process.env.TEST_NAME,
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill(process.env.TEST_USERNAME);
      await page.getByTestId("password").fill(process.env.TEST_PASSWORD);
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText(`Logged in as ${process.env.TEST_USERNAME}`)
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("1");
      await page.getByTestId("password").fill("2");
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("Incorrect login credentials")
      ).toBeVisible();
    });

  });
});
