import { Link, useParams } from "react-router-dom";
import "./ticket.css";

export const Ticket = ({ ticket }) => {
  const { clientId, projectId } = useParams();
  return (
    <div className="border-slate-600 rounded-lg p-3 my-3 mx-auto w-11/12 h-auto shadow-xl text-center">
      <div className="flex flex-row w-full justify-end">
        <Link
          to={`/clients/${clientId}/projects/${projectId}/kanban/${ticket.id}`}
        >
          View
        </Link>
      </div>

      <p className="font-bold">{ticket.title}</p>
      <p>{ticket.status}</p>
      <p>{ticket.createdAt}</p>
    </div>
  );
};
