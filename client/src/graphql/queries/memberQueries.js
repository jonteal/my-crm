import { gql } from "@apollo/client";

const GET_MEMBER = gql`
  query getClient($id: ID) {
    client(id: $id) {
      id
      username
      emailAddress
      companyName
      password
    }
  }
`;

export { GET_MEMBER };
