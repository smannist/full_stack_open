import { useMutation } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

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
      return response;
    } catch (error) {
      console.log("An error occured during sign in:", error);
      throw new Error("Failed to sign in");
    }
  };

  return [signIn, result];
};

export default useSignIn;
