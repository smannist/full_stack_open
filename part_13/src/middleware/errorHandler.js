const capitalize = require("../utils/capitalize");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }

  if (error.name === "SequelizeValidationError") {
    const notNullError = error.errors.find(
      (err) => err.type === "notNull Violation"
    );

    if (notNullError) {
      return response
        .status(400)
        .send({ error: `${capitalize(notNullError.path)} is required.` });
    }

    const isEmailError = error.errors.find(
      (err) => err.type === "Validation error" && err.validatorKey === "isEmail"
    );

    if (isEmailError) {
      return response
        .status(400)
        .send({ error: "Validation isEmail on username failed" });
    }
  }

  next(error);
};

module.exports = errorHandler;
