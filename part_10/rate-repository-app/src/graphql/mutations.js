import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;
