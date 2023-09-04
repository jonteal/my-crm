import { gql } from "@apollo/client";

const GET_ACTIVITY_COMMENTS = gql`
  query getActivityComments {
    activityComments {
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

const GET_ACTIVITY_COMMENT = gql`
  query getActivityComment($id: ID) {
    activityComment(id: $id) {
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

export { GET_ACTIVITY_COMMENTS, GET_ACTIVITY_COMMENT };
