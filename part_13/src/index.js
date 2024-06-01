const express = require("express");
const cors = require("cors");
const Blog = require("./models/blog");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/blogs", async (_, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }

});

app.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
