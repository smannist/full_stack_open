const { test, expect, beforeEach, describe } = require("@playwright/test");

const mockBlog = {
  title: "test blog",
  author: "test author",
  url: "test url",
  likes: 0,
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Testerino Mc Testerino",
        username: "McTesterino",
        password: "Testing",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("McTesterino");
      await page.getByTestId("password").fill("Testing");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Logged in as McTesterino")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("1");
      await page.getByTestId("password").fill("2");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Incorrect login credentials")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId("username").fill("McTesterino");
        await page.getByTestId("password").fill("Testing");
        await page.getByRole("button", { name: "login" }).click();
      });

      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "new blog" }).click();
        await page.getByTestId("title").fill(mockBlog.title);
        await page.getByTestId("author").fill(mockBlog.author);
        await page.getByTestId("url").fill(mockBlog.url);
        await page.getByRole("button", { name: "Create" }).click();

        await expect(
          page.getByText(`${mockBlog.title} ${mockBlog.author}`)
        ).not.toBeVisible();
      });

      describe("When a new blog has been created", () => {
        beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "new blog" }).click();
          await page.getByTestId("title").fill(mockBlog.title);
          await page.getByTestId("author").fill(mockBlog.author);
          await page.getByTestId("url").fill(mockBlog.url);
          await page.getByRole("button", { name: "Create" }).click();
          await page.getByRole("button", { name: "View" }).click();
        });

        test("a blog can be liked", async ({ page }) => {
          await expect(page.getByText("Likes: 0")).toBeVisible();
          await page.getByRole("button", { name: "Like" }).click();
          await expect(page.getByText("Likes: 1")).toBeVisible();
        });

        test("a blog can be removed", async ({ page }) => {
          page.on("dialog", async (dialog) => {
            expect(dialog.message()).toEqual(
              `Remove blog ${mockBlog.title} by ${mockBlog.author}?`
            );
            await dialog.accept();
          });

          await page.getByRole("button", { name: "Remove" }).click();

          await expect(
            page.getByText(`${mockBlog.title} ${mockBlog.author}`)
          ).not.toBeVisible();

          await expect(
            page.getByText(`Blog "${mockBlog.title}" removed!`)
          ).toBeVisible();
        });
      });
    });
  });
});
