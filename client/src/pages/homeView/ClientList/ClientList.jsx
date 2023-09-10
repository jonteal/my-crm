import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import ClientsContainer from "../../../components/ClientsContainer/ClientsContainer";
import Spinner from "../../../components/reusable/Spinner/Spinner";

import { FaUserAlt } from "react-icons/fa";

import "./clientList.css";

const rootClass = "clients";

const ClientList = () => {
  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS);

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "lead",
      state: "Lead",
    },
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current",
    },
    {
      id: "former",
      state: "Former",
    },
    {
      id: "cold",
      state: "Cold",
    },
  ];

  return (
    <div className={`${rootClass}-parent-container`}>
      <div className={`${rootClass}-header-container flex flex-row`}>
        <FaUserAlt className={`${rootClass}-header-icon mr-5`} />
        <h5 className={`${rootClass}-header-label mb-3`}>
          Clients ({clientData?.clients.length})
        </h5>
      </div>
      <ul>
        {clientContainers.map((clientContainer) => (
          <ClientsContainer
            key={clientContainer.id}
            clientContainer={clientContainer}
            clientData={clientData}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
