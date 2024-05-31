import { useApolloClient, useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const createUser = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username,
          password,
        },
      });

      apolloClient.resetStore();

      return response;
    } catch (error) {
      console.log("An error occured during user creation:", error);
      throw new Error("Failed to create user");
    }
  };

  return [createUser, result];
};

export default useCreateUser;
