const capitalize = require("../utils/capitalize");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }

  if (error.name === "SequelizeValidationError") {
    const errorMessages = {
      "notNull Violation": (err) => `${capitalize(err.path)} is required.`,
      isEmail: () => "Validation isEmail on username failed",
      max: () => "The year can't be greater than the current year",
      min: () => "The year can't be less than 1991",
    };

    const errorHandler = error.errors.find(
      (err) => errorMessages[err.type] || errorMessages[err.validatorKey]
    );

    if (errorHandler) {
      const errorMessage = (
        errorMessages[errorHandler.type] ||
        errorMessages[errorHandler.validatorKey]
      )(errorHandler);

      return response.status(400).send({ error: errorMessage });
    }
  }

  next(error);
};

module.exports = errorHandler;
