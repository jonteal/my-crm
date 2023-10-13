import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineStop } from "react-icons/ai";

export const Ticket = ({ ticket }) => {
  const { clientId, projectId } = useParams();
  const [isBlocked, setIsBlocked] = useState(ticket.blocked);

  const handleBlockTicket = () => {
    setIsBlocked(!isBlocked);
  };

  return (
    <div className="border-slate-600 bg-slate-50 rounded-lg p-3 my-3 mx-auto w-11/12 h-auto shadow-md text-center">
      <div className="flex flex-row w-full justify-end">
        <button
          onClick={handleBlockTicket}
          className={`border ${
            isBlocked ? "bg-red-600" : "bg-red-50"
          } rounded-full mr-3`}
        >
          <AiOutlineStop
            className={`${isBlocked ? "text-slate-50" : "text-slate-700"} `}
          />
        </button>
        <Link
          to={`/clients/${clientId}/projects/${projectId}/kanban/${ticket.id}`}
        >
          <span className="text-sm">View</span>
        </Link>
      </div>
      <p className="font-bold text-sm text-left my-2">{ticket.title}</p>
      <p className="text-left text-sm my-2">{ticket.description}</p>
      <p className="text-left text-sm my-2">{ticket.createdAt}</p>
      {isBlocked && (
        <div className="bg-red-500 text-slate-50 text-sm rounded-2xl mt-2 py-1">
          {ticket.blockedReason || "Blocked"}
        </div>
      )}
    </div>
  );
};
