import { gql } from "@apollo/client";

const GET_TICKETS = gql`
  query getTickets($projectId: ID) {
    tickets(projectId: $projectId) {
      id
      title
      description
      status
      blocked
      blockedReason
      project {
        id
      }
      createdAt
    }
  }
`;

const GET_TICKET = gql`
  query getTicket($id: ID) {
    ticket(id: $id) {
      id
      title
      description
      status
      blocked
      blockedReason
      project {
        id
      }
      createdAt
    }
  }
`;

export { GET_TICKETS, GET_TICKET };
