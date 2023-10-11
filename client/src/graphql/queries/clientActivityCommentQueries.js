import { gql } from "@apollo/client";

const GET_CLIENT_ACTIVITY_COMMENTS = gql`
  query getClientActivityComments($clientId: ID) {
    clientActivityComments(clientId: $clientId) {
      id
      commentText
      createdAt
      client {
        id
        firstName
        lastName
      }
    }
  }
`;

const GET_CLIENT_ACTIVITY_COMMENT = gql`
  query getClientActivityComment($id: ID) {
    clientActivityComment(id: $id) {
      id
      commentText
      createdAt
      client {
        id
        firstName
        lastName
      }
    }
  }
`;

export { GET_CLIENT_ACTIVITY_COMMENTS, GET_CLIENT_ACTIVITY_COMMENT };
