import { useApolloClient, useMutation } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });

      await authStorage.setAccessToken(
        response.data.authenticate.accessToken
      );

      apolloClient.resetStore();

      return response;
    } catch (error) {
      console.log("An error occured during sign in:", error);
      throw new Error("Failed to sign in");
    }
  };

  return [signIn, result];
};

export default useSignIn;
