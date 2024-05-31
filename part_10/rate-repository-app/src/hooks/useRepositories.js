import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : { edges: [] },
    loading,
    error,
  };
};

export default useRepositories;
