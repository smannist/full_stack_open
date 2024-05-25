import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphQLUrl } from "../constants";

const createApolloClient = () => {
  return new ApolloClient({
    uri: graphQLUrl,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
