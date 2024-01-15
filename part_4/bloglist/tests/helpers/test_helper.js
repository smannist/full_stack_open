const Blog = require("../../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const addBlog = async (api, blogData) => {
  await api
    .post("/api/blogs")
    .send(blogData);
}

const deleteBlogById = async (api, blogId) => {
  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204);
};

const updateBlogById = async (api, blogId, blogToUpdate) => {
  await api
      .put(`/api/blogs/${blogId}`)
      .send(blogToUpdate);
}

const postBlogAndExpectStatus = async (api, blogData, expectedStatusCode) => {
  await api
    .post("/api/blogs")
    .send(blogData)
    .expect(expectedStatusCode);
};

module.exports = {
  blogsInDb,
  addBlog,
  deleteBlogById,
  updateBlogById,
  postBlogAndExpectStatus,
};
