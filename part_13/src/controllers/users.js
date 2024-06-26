const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (_, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: ["id", "author", "title", "url", "likes", "year"],
        through: {
          as: "readingLists",
          attributes: { exclude: ["userId", "blogId"] },
          where
        },
      },
    ],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }

});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    user.username = req.body.username;
    user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }

});

module.exports = router;
