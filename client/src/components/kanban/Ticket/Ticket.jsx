import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_TICKET } from "../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../graphql/queries/ticketQueries";

export const Ticket = ({ ticket }) => {
  const navigate = useNavigate();

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticket.id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_TICKETS }],
  });

  return (
    <div className="ticket-container">
      <div className="ticket-links">
        <div className="dropdown">
          <a
            className="btn dropdown-toggle"
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></a>

          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href={`/tickets/${ticket.id}`}>
                View
              </a>
            </li>
            <li>
              <button className="dropdown-item" onClick={deleteTicket}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      <p className="ticket-title">{ticket.title}</p>
      <p>{ticket.status}</p>
      <p>{ticket.createdAt}</p>
    </div>
  );
};
