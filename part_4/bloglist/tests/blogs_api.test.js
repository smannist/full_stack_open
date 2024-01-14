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

describe("Blogs API rest functionality", () => {
  test("blogs are returned as correct sized json", async () => {
    const response = await api.get("/api/blogs").expect(200);

    expect(response.body).toHaveLength(mockData.blogs.length);
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
