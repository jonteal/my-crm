import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query getTransactions {
    transactions {
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
      createdAt
    }
  }
`;

const GET_TRANSACTION = gql`
  query getTransaction($id: ID) {
    invoice(id: $id) {
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
      createdAt
    }
  }
`;

export { GET_TRANSACTIONS, GET_TRANSACTION };