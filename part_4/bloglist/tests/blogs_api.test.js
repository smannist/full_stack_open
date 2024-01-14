const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const mockData = require("./mock_data/blog");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockData.blogs);
});

describe("Blogs API GET", () => {
  test("blogs are returned as correct sized json", async () => {
    const response = await api.get("/api/blogs").expect(200);

    expect(response.body).toHaveLength(mockData.blogs.length);
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
    await api
      .post("/api/blogs")
      .send(mockData.mockBlog)
      .expect(201);

    const response = await api.get("/api/blogs");
    const blogTitles = response.body.map(blog => blog.title);

    expect(response.body).toHaveLength(mockData.blogs.length + 1);
    expect(blogTitles).toContain(mockData.mockBlog.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
