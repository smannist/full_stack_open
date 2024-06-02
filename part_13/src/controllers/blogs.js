const router = require("express").Router();
const { Blog } = require("../models");

const fieldChecker = require("../middleware/fieldchecker");

router.get("/", async (_, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  return res.json(blog)
});

router.put("/:id", fieldChecker, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }

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