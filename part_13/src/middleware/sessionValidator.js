const { Session, User } = require("../models");

const sessionValidator = async (req, res, next) => {
  const token = req.headers["authorization"]?.substring(7);

  const session = await Session.findOne({
    where: {
      token: token,
      userId: req.decodedToken.id,
    },
    include: {
      model: User,
      attributes: ["disabled"],
    },
  });

  if (!session) {
    return res.status(400).json({ error: "Invalid session." });
  }

  if (session.user.disabled) {
    return res.status(403).json({ error: "The user is disabled." });
  }

  next();
};

module.exports = sessionValidator;
