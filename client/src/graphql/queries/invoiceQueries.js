import { gql } from "@apollo/client";

const GET_INVOICES = gql`
  query getInvoices {
    invoices {
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

const GET_INVOICE = gql`
  query getInvoice($id: ID) {
    invoice(id: $id) {
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

export { GET_INVOICES, GET_INVOICE };
