const { GraphQLError } = require("graphql");

const saveError = (error) => {
  throw new GraphQLError("Saving book failed", {
    extensions: {
      code: "BAD_USER_INPUT",
      error,
    },
  });
};

module.exports = saveError;
