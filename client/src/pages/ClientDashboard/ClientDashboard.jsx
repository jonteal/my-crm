// LIBRARIES
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ClientCard from "../../components/ClientCard/ClientCard";

// GRAPHQL
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

const ClientDashboard = () => {
  const { id } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });
  return (
    <div>
      {!clientLoading && !clientError && <ClientCard clientData={clientData} />}
    </div>
  );
};

export default ClientDashboard;
