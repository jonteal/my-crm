// LIBRARIES
import { useParams } from "react-router-dom";
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
    <div className="w-full mx-2 rounded-xl">
      {!clientLoading && !clientError && <ClientCard clientData={clientData} />}
    </div>
  );
};

export default ClientDashboard;
