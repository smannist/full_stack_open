import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS, REVIEW_DETAILS, USER_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
            user {
              ...UserDetails
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
  ${USER_DETAILS}
`;

export const USER = gql`
  query getCurrentUser(
    $includeReviews: Boolean = false
  ) {
    me {
      ...UserDetails
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repository {
              fullName
            }
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
  ${USER_DETAILS}
`;
