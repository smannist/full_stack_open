const router = require("express").Router();
const { Op } = require("sequelize");

const { Blog, User } = require("../models");

const fieldChecker = require("../middleware/fieldChecker");
const tokenExtractor = require("../middleware/tokenExtractor");
const sessionValidator = require("../middleware/sessionValidator");

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        url: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
    where,
    order: [["likes", "DESC"]],
  });

  res.json(blogs);
});

router.post("/", tokenExtractor, sessionValidator, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
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

router.delete("/:id", tokenExtractor, sessionValidator, async (req, res) => {
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
