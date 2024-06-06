const router = require("express").Router();

const { ReadingList } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");
const sessionValidator = require("../middleware/sessionValidator");

router.post("/", async (req, res) => {
  const addToReadingList = await ReadingList.create(req.body);

  res.json(addToReadingList);
});

router.put("/:id", tokenExtractor, sessionValidator, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  const currentUserId = req.decodedToken.id;

  if (!readingList) {
    return res.status(404).end();
  }

  if (readingList.userId !== currentUserId) {
    return res.status(403).end();
  }

  readingList.read = req.body.read;
  await readingList.save();

  res.json({ read: readingList.read });
});

module.exports = router;
