const { GraphQLError } = require("graphql");

const saveError = (error) => {
  throw new GraphQLError("Saving book failed", {
    extensions: {
      code: "BAD_USER_INPUT",
      error,
    },
  });
};

const userError = (error, args) => {
  throw new GraphQLError("Creating user failed", {
    extensions: {
      code: "BAD_USER_INPUT",
      invalidArgs: args.username,
      error,
    },
  });
};

const invalidCredentialsError = () => {
  throw new GraphQLError("Invalid credentials", {
    extensions: {
      code: "BAD_USER_INPUT",
    },
  });
};

module.exports = {
  saveError,
  userError,
  invalidCredentialsError,
};
