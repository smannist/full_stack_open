const router = require("express").Router();

const { ReadingList, User } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");

router.post("/", async (req, res) => {
  const addToReadingList = await ReadingList.create(req.body);

  res.json(addToReadingList);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);

  if (readingList) {
    readingList.read = req.body.read;
    readingList.save();
    res.json({ read: readingList.read });
  } else {
    res.status(404).end();
  }

});

module.exports = router;
