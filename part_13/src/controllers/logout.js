const router = require("express").Router();

const tokenExtractor = require("../middleware/tokenExtractor");

const Session = require("../models/session");

router.delete("/", tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: { userId: req.decodedToken.id },
  });

  return res.json({ message: "logout successful" });
});

module.exports = router;
