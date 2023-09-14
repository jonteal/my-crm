import { gql } from "@apollo/client";

const ADD_SERVICE = gql`
  mutation AddService(
    $service: String!
    $cost: String!
    $status: ServiceStatus!
    $clientId: ID!
    $startDate: String
    $endDate: String
  ) {
    addService(
      service: $service
      cost: $cost
      status: $status
      clientId: $clientId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      service
      cost
      status
      client {
        id
        firstName
        lastName
      }
      startDate
      endDate
      createdAt
    }
  }
`;

const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: ID!
    $service: String
    $cost: String
    $status: ProjectStatusUpdate
    $startDate: String
    $endDate: String
  ) {
    updateProject(
      id: $id
      service: $service
      cost: $cost
      status: $status
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      service
      cost
      status
      client {
        id
        firstName
        lastName
      }
      startDate
      endDate
      createdAt
    }
  }
`;

export { ADD_SERVICE, UPDATE_SERVICE, DELETE_SERVICE };