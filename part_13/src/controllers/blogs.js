const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (_, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
});

router.delete("/:id", async (req, res) => {
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

module.exports = router;
