const { response } = require("express");

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({ error: 'Unknown endpoint' });
}

const internalServerError = (request, response) => {
  response
    .status(500)
    .send({error: "Internal Server Error"})
}

const badRequest = (request, responset) => {
  response
    .status(400)
    .send({error: "Name or number is missing or person with the same name \
    is already added to the phonebook"})
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response
            .status(400)
            .send({ error: 'Malformatted id' });
  }

  next(error);
}

module.exports = {
  unknownEndpoint,
  internalServerError,
  badRequest,
  errorHandler,
};