import { gql } from "@apollo/client";

const GET_PROJECT_INVOICES = gql`
  query getProjectInvoices($projectId: ID) {
    projectInvoices(projectId: $projectId) {
      id
      date
      amount
      notes
      invoiceNumber
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

const GET_INVOICES = gql`
  query getInvoices($clientId: ID) {
    invoices(clientId: $clientId) {
      id
      date
      amount
      notes
      invoiceNumber
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

const GET_INVOICE = gql`
  query getInvoice($id: ID) {
    invoice(id: $id) {
      id
      date
      amount
      notes
      invoiceNumber
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

export { GET_PROJECT_INVOICES, GET_INVOICES, GET_INVOICE };
