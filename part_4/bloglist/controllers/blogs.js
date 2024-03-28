const blogsRouter = require("express").Router();
const { authenticateToken } = require("../middleware/auth");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", authenticateToken, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.token.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!newBlog.title || !newBlog.url) {
    response.status(400).end();
  } else {
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", authenticateToken, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== request.token.id) {
    const permissionError = new Error("Permission denied");
    permissionError.name = "PermissionError";
    throw permissionError;
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  try {
    updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    response.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const blogToUpdate = await Blog.findById(request.params.id);

  blogToUpdate.comments.push(request.body.comment);

  const updatedBlog = await blogToUpdate.save();

  response.json(updatedBlog);
});

module.exports = blogsRouter;
