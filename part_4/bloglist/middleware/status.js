const badRequest = (request, response) => {
  response
    .status(400)
    .send({ error: "Title or url is missing." });
};

module.exports = {
  badRequest,
};
