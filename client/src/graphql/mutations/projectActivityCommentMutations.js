import { gql } from "@apollo/client";

const ADD_PROJECT_ACTIVITY_COMMENT = gql`
  mutation addProjectActivityComment($commentText: String!, $projectId: ID!) {
    addProjectActivityComment(
      commentText: $commentText
      projectId: $projectId
    ) {
      id
      commentText
      createdAt
      project {
        id
        title
        description
        status
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const DELETE_PROJECT_ACTIVITY_COMMENT = gql`
  mutation DeleteProjectActivityComment($id: ID!) {
    deleteProjectActivityComment(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT_ACTIVITY_COMMENT = gql`
  mutation UpdateProjectActivityComment(
    $commentText: String!
    $createdAt: String!
    $projectId: ID!
  ) {
    updateProjectActivityComment(
      commentText: $commentText
      status: $status
      clientId: $clientId
    ) {
      id
      commentText
      createdAt
      projectId {
        id
      }
    }
  }
`;

export {
  ADD_PROJECT_ACTIVITY_COMMENT,
  UPDATE_PROJECT_ACTIVITY_COMMENT,
  DELETE_PROJECT_ACTIVITY_COMMENT,
};
