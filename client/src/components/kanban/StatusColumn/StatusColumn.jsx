import { Ticket } from "../Ticket/Ticket";

export const StatusColumn = ({ statusColumns, ticketData }) => {
  return (
    <div className="flex flex-row items-start ml-2">
      {statusColumns.map((column) => (
        <div
          key={column.id}
          className="flex flex-col items-center border-slate-500 w-1/2 mt-2 mr-2 rounded-lg h-auto min-h-screen bg-slate-300"
        >
          <h5 className="mt-3 font-extrabold">{column.state}</h5>
          <ul className="list-none pl-0 w-full">
            {ticketData.tickets
              .filter((ticket) => ticket.status === column.state)
              .map((ticket) => (
                <li key={ticket.id} className="w-full">
                  <Ticket ticket={ticket} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
