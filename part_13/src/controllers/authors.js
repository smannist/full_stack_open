const router = require("express").Router();

const { Blog } = require("../models");

const { sequelize } = require("../utils/db");

router.get("/", async (_, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [
        sequelize.fn(
          "COUNT",
          sequelize.col("id")
        ),
          "articles"
      ],
      [
        sequelize.fn(
          "SUM",
          sequelize.col("likes")
        ),
          "likes"
      ],
    ],
    group: "author",
    order: [
      ["likes", "DESC"],
    ],
  });

  res.json(authors);
});

module.exports = router;
