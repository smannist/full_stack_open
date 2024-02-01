const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  if (request.path === "/api/blogs" && request.method === "POST") {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.token = decodedToken;
  }
  next();
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = { authenticateToken, getTokenFrom };
