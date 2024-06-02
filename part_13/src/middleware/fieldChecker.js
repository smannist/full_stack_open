const fieldChecker = (req, res, next) => {
  if (!req.body.likes) {
    return res.status(400).json({ error: "Likes is required." });
  }

  next();
};

module.exports = fieldChecker;
