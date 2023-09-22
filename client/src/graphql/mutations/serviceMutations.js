import { gql } from "@apollo/client";

const ADD_SERVICE = gql`
  mutation AddService(
    $service: String!
    $cost: String!
    $notes: String
    $inHouse: ServiceProvider!
    $paymentSchedule: ServicePaymentSchedule!
    $status: ServiceStatus!
    $projectId: ID!
    $startDate: String
    $endDate: String
  ) {
    addService(
      service: $service
      cost: $cost
      notes: $notes
      inHouse: $inHouse
      paymentSchedule: $paymentSchedule
      status: $status
      projectId: $projectId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      service
      cost
      notes
      inHouse
      paymentSchedule
      status
      project {
        id
        title
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
    $inHouse: ServiceProviderUpdate
    $notes: String
    paymentSchedule: ServicePaymentScheduleUpdate
    $status: ProjectStatusUpdate
    $startDate: String
    $endDate: String
  ) {
    updateProject(
      id: $id
      service: $service
      cost: $cost
      inHouse: $inHouse
      notes: $notes
      paymentSchedule: $paymentSchedule
      status: $status
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      service
      cost
      inHouse
      notes
      paymentSchedule
      status
      project {
        id
        title
      }
      startDate
      endDate
      createdAt
    }
  }
`;

export { ADD_SERVICE, UPDATE_SERVICE, DELETE_SERVICE };
