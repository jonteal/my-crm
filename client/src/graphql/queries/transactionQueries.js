import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query getTransactions($projectId: ID) {
    transactions(projectId: $projectId) {
      id
      paymentDate
      amount
      paymentParty
      incomingOutgoing
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      createdAt
    }
  }
`;

const GET_TRANSACTION = gql`
  query getTransaction($id: ID) {
    transaction(id: $id) {
      id
      paymentDate
      amount
      paymentParty
      incomingOutgoing
      client {
        id
        firstName
        lastName
      }
      project {
        id
        title
      }
      createdAt
    }
  }
`;

export { GET_TRANSACTIONS, GET_TRANSACTION };
