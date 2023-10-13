import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TICKET } from "../../../../graphql/queries/ticketQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { FaRegEdit } from "react-icons/fa";

import "./ticketView.css";

export const TicketView = () => {
  const { ticketId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(-1);
  };

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  console.log("ticketData: ", ticketData);

  return (
    <div className="ticket-view-container">
      {!ticketLoading && !ticketError && (
        <div className="ticket-view-card">
          <div className="mx-auto w-100 p-5">
            <div className="ticket-view-controls">
              <button
                onClick={handleBackNavigate}
                className="btn btn-light btn-sm w-25 d-inline ms-auto back-btn"
              >
                <FaRegArrowAltCircleLeft className="back-arrow" />{" "}
                <span>Back</span>
              </button>
            </div>

            <div className="ticket-view-content">
              <h4>{ticketData?.ticket?.title}</h4>
              <div className="description">
                <p>{ticketData?.ticket?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
