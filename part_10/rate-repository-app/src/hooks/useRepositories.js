import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
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
