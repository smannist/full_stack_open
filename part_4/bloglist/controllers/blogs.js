const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  const user = await User.findById(decodedToken.id);

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

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log(error);
  }
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

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = blogsRouter;
