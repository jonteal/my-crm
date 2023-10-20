import { gql } from "@apollo/client";

const ADD_MEMBER = gql`
  mutation addClient(
    $username: String!
    $emailAddress: String!
    $companyName: String
    $password: String!
  ) {
    addMember(
      username: $username
      emailAddress: $emailAddress
      companyName: $companyName
      password: $password
    ) {
      id
      username
      emailAddress
      companyName
      password
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation deleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $id: ID!
    $username: String
    $emailAddress: String
    $companyName: String
    $password: String
  ) {
    updateClient(
      id: $id
      username: $username
      emailAddress: $emailAddress
      companyName: $companyName
      password: $password
    ) {
      id
      username
      emailAddress
      companyName
      password
    }
  }
`;

export { ADD_MEMBER, DELETE_MEMBER, UPDATE_MEMBER };
