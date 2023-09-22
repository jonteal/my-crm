// LIBRARIES
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import ClientViewNav from "../../../components/dashboardMain/ClientViewNav/ClientViewNav";
import Spinner from "../../../components/reusable/Spinner/Spinner";

import "./clientView.css";

const rootClass = "client-view";

export const ClientView = () => {
  const { id } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  if (clientLoading) return <Spinner />;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;

  return (
    <div>
      {!clientLoading && !clientError && (
        <div className={`${rootClass}-container bg-slate-200`}>
          <div className={`${rootClass}-info-container flex flex-row`}>
            <ClientViewNav clientData={clientData} />
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
