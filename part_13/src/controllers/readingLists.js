const router = require("express").Router();

const { ReadingList } = require("../models");

router.post("/", async (req, res) => {
  const addToReadingList = await ReadingList.create(req.body);

  res.json(addToReadingList);
});

module.exports = router;