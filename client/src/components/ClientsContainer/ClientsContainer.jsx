import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./clientsContainer.css";
import ClientTable from "../ClientTable/ClientTable";

const rootClass = "client-container";

const ClientsContainer = ({ clientData, clientContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
        <div
          key={clientContainer.id}
          className={`${rootClass}-status-container`}
        >
          <div className={`${rootClass}-header-section`}>
            <h5 className={`${rootClass}-state-label`}>
              {clientContainer.state}
            </h5>
            {isExpanded ? (
              <FaChevronUp
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            ) : (
              <FaChevronDown
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            )}
          </div>

          {isExpanded && (
            <ClientTable
              key={clientContainer.id}
              clientContainer={clientContainer}
              clients={clientData.clients}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsContainer;
