import { gql } from "@apollo/client";

const ADD_INVOICE = gql`
  mutation AddInvoice(
    $date: String!
    $amount: String!
    $clientId: ID!
    $invoiceNumber: String!
  ) {
    addInvoice(
      date: $date
      amount: $amount
      invoiceNumber: $invoiceNumber
      clientId: $clientId
    ) {
      id
      date
      amount
      invoiceNumber
      client {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`;

const UPDATE_INVOICE = gql`
  mutation UpdateInvoice(
    $id: ID!
    $date: String
    $amount: String
    $invoiceNumber: String
  ) {
    updateProject(
      id: $id
      date: $date
      amount: $amount
      invoiceNumber: $invoiceNumber
    ) {
      id
      date
      amount
      invoiceNumber
      client {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export { ADD_INVOICE, UPDATE_INVOICE, DELETE_INVOICE };
