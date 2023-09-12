import { gql } from "@apollo/client";

const GET_SERVICES = gql`
  query getServices {
    services {
      id
      service
      cost
      status
      client {
        id
        firstName
        lastName
      }
      createdAt
      startDate
      endDate
    }
  }
`;

const GET_SERVICE = gql`
  query getService($id: ID) {
    service(id: $id) {
      id
      service
      cost
      status
      client {
        id
        firstName
        lastName
      }
      createdAt
      startDate
      endDate
    }
  }
`;

export { GET_SERVICES, GET_SERVICE };
