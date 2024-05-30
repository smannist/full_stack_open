import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await mutate({
        variables: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      });
      return response;
    } catch (error) {
      console.log("An error occured while creating review:", error);
    }
  };

  return [createReview, result];
};

export default useCreateReview;
