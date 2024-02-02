const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const mockData = require("./mock_data/blog");
const mockUserData = require("./mock_data/user");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./helpers/test_helper");

const api = supertest(app);

let token;
let invalidToken = "thisisnotcorrect";

beforeEach(async () => {
  await User.deleteMany({});

  const saltRounds = 10;

  await Promise.all(
    mockUserData.mockUsers.map(async (user) => {
      user.pwdHash = await bcrypt.hash(user.password, saltRounds);
    })
  );

  await User.insertMany(mockUserData.mockUsers);

  // Searching for user_id in database and adding the value to mock_data is probably not the best way
  // But it was the first that came to my mind
  const user = await User.findOne({ username: "solarcityfan2024" });

  await Promise.all(
    mockData.listWithMultipleBlogs.map(async (blog) => {
      blog.user = user._id;
    })
  );

  const credentials = {
    username: "solarcityfan2024",
    password: "yetanothersecretpassword",
  };

  token = await helper.loginAndGetToken(api, credentials);

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
    await helper.addBlog(api, mockData.mockBlog, token);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(mockData.listWithMultipleBlogs.length + 1);
    expect(blogsAtEnd.map((blog) => blog.title)).toContain(
      mockData.mockBlog.title
    );
  });

  test("if likes are not specified, default to zero", async () => {
    await helper.addBlog(api, mockData.mockBlogNoLikes, token);

    const response = await helper.blogsInDb();

    expect(response[response.length - 1].likes).toBe(0);
  });

  test("if title or url is not specified, respond with 400 bad request", async () => {
    await helper.postBlogAndExpectStatus(api, mockData.mockBlogNoTitle, token, 400);
    await helper.postBlogAndExpectStatus(api, mockData.mockBlogNoUrl, token, 400);
    await helper.postBlogAndExpectStatus(
      api,
      mockData.mockBlogNoTitleOrUrl,
      token,
      400
    );
  });

  test("if token is incorrect or missing, respond with 401 unauthorized", async () => {
    const response = await helper.addBlog(
      api,
      mockData.mockBlogNoLikes,
      invalidToken
    );
    expect(response.status).toBe(401);
  });
});

describe("Blogs API DELETE", () => {
  test("blog is deleted correctly", async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await helper.deleteBlogById(api, blogToDelete.id, token);

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

    await helper.updateBlogById(api, blogToUpdate.id, blogToUpdate);

    const updatedBlogs = await helper.blogsInDb();

    expect(updatedBlogs[0].title).toBe("Updated Blog Title");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
