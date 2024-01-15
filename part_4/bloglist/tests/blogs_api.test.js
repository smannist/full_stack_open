const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const mockData = require("./mock_data/blog");
const Blog = require("../models/blog");
const helper = require("./helpers/test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockData.listWithMultipleBlogs);
});

describe("Blogs API GET", () => {
  test("blogs are returned as correct sized json", async () => {
    const response = await api.get("/api/blogs").expect(200);

    expect(response.body).toHaveLength(mockData.listWithMultipleBlogs.length);
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });

  test("each blog can be identified by id", async () => {
    const blogs = await helper.blogsInDb();

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("Blogs API POST", () => {
  test("new blog is added correctly", async () => {
    await helper.addBlog(api, mockData.mockBlog);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      mockData.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtEnd.map(blog => blog.title)).toContain(mockData.mockBlog.title);
  });

  test("if likes are not specified, default to zero", async () => {
    await helper.addBlog(api, mockData.mockBlogNoLikes);

    const response = await helper.blogsInDb();

    expect(response[response.length - 1].likes).toBe(0);
  });

  test("if title or url is not specified, respond with 400 bad request", async () => {
    await helper.postBlogAndExpectStatus(api, mockData.mockBlogNoTitle, 400);
    await helper.postBlogAndExpectStatus(api, mockData.mockBlogNoUrl, 400);
    await helper.postBlogAndExpectStatus(api, mockData.mockBlogNoTitleOrUrl, 400);
  });
});

describe("Blogs API DELETE", () => {
  test("blog is deleted correctly", async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await helper.deleteBlogById(api, blogToDelete.id);

    const blogsAfterDelete = await helper.blogsInDb();

    expect(blogsAfterDelete).not.toContain(blogToDelete.id);
    expect(blogsAfterDelete).toHaveLength(blogs.length - 1);
  });
});

describe("Blogs API PUT", () => {
  test("blog is updated correctly", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    blogToUpdate.title = "Updated Blog Title";

    await helper
      .updateBlogById(api,
                     blogToUpdate.id,
                     blogToUpdate);

    const updatedBlogs = await helper.blogsInDb();

    expect(updatedBlogs[0].title).toBe("Updated Blog Title");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
