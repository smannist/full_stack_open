const Blog = require("../../models/blog");
const User = require("../../models/user");

const loginAndGetToken = async (api, credentials) => {
  const response = await api
    .post("/api/login")
    .send(credentials)
  return response.body.token;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const addBlog = async (api, blogData, token) => {
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blogData);
  return response;
};

const deleteBlogById = async (api, blogId, token) => {
  await api
    .delete(`/api/blogs/${blogId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
};

const updateBlogById = async (api, blogId, blogToUpdate) => {
  await api
    .put(`/api/blogs/${blogId}`)
    .send(blogToUpdate);
};

const postBlogAndExpectStatus = async (api, blogData, token, expectedStatusCode) => {
  await api.post("/api/blogs")
    .send(blogData)
    .set("Authorization", `Bearer ${token}`)
    .expect(expectedStatusCode);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const addUser = async (api, userData) => {
  const response = await api
    .post("/api/users")
    .send(userData);
  return response;
};

const postUserAndExpectStatus = async (api, userData, expectedStatusCode) => {
  await api.post("/api/users")
    .send(userData)
    .expect(expectedStatusCode);
};

module.exports = {
  blogsInDb,
  addBlog,
  deleteBlogById,
  updateBlogById,
  postBlogAndExpectStatus,
  usersInDb,
  addUser,
  postUserAndExpectStatus,
  loginAndGetToken
};
