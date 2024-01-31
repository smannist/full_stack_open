const Blog = require("../../models/blog");
const User = require("../../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const addBlog = async (api, blogData) => {
  await api
    .post("/api/blogs")
    .send(blogData);
};

const deleteBlogById = async (api, blogId) => {
  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204);
};

const updateBlogById = async (api, blogId, blogToUpdate) => {
  await api
    .put(`/api/blogs/${blogId}`)
    .send(blogToUpdate);
};

const postBlogAndExpectStatus = async (api, blogData, expectedStatusCode) => {
  await api.post("/api/blogs")
    .send(blogData)
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
  postUserAndExpectStatus
};
