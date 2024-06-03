const router = require("express").Router();
const { Op } = require("sequelize");

const { Blog } = require("../models");
const { User } = require("../models");

const fieldChecker = require("../middleware/fieldChecker");
const tokenExtractor = require("../middleware/tokenExtractor");

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.substring]: req.query.search,
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
    where
  });

  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });

  return res.json(blog);
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

router.delete("/:id", tokenExtractor, async (req, res) => {
  const blog = await Blog.destroy({
    where: {
      id: req.params.id,
      userId: req.decodedToken.id,
    },
  });

  if (blog) {
    res.json(blog);
  } else {
    res.status(401).end();
  }

});

module.exports = router;
