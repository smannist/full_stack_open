const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const mockData = require("./mock_data/blog");
const Blog = require("../models/blog");

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
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("Blogs API POST", () => {
  test("new blog is added correctly", async () => {
    await api.post("/api/blogs").send(mockData.mockBlog).expect(201);

    const response = await api.get("/api/blogs");
    const blogTitles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(
      mockData.listWithMultipleBlogs.length + 1
    );
    expect(blogTitles).toContain(mockData.mockBlog.title);
  });

  test("if likes are not specified, default to zero", async () => {
    await api.post("/api/blogs").send(mockData.mockBlogNoLikes).expect(201);

    const response = await api.get("/api/blogs");
    const latestBlog = response.body.length - 1;

    expect(response.body[latestBlog].likes).toBe(0);
  });

  test("if title or url is not specified, respond with 400 bad request", async () => {
    await api.post("/api/blogs").send(mockData.mockBlogNoTitle).expect(400);

    await api.post("/api/blogs").send(mockData.mockBlogNoUrl).expect(400);

    await api
      .post("/api/blogs")
      .send(mockData.mockBlogNoTitleOrUrl)
      .expect(400);
  });
});

describe("Blogs API DELETE", () => {
  test("blog is deleted correctly", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToDelete = blogs.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDelete = await api.get("/api/blogs");

    expect(blogsAfterDelete).not.toContain(blogToDelete.id);
    expect(blogsAfterDelete.body).toHaveLength(blogs.body.length - 1);
  });
});

describe("Blogs API PUT", () => {
  test("blog is updated correctly", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToUpdate = blogs.body[0];

    blogToUpdate.title = "Updated Blog Title";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate);

    const updatedBlogs = await api.get("/api/blogs");

    expect(updatedBlogs.status).toBe(200);
    expect(updatedBlogs.body[0].title).toBe("Updated Blog Title");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
