import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";

export const ProjectKanban = () => {
  const { projectId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS, {
    variables: { projectId },
  });

  const statusColumns = [
    {
      id: "Ready",
      state: "Ready",
    },
    {
      id: "In Progress",
      state: "In Progress",
    },
    {
      id: "Done",
      state: "Done",
    },
  ];

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong...</p>;

  return (
    <div className="kanban-container">
      <Link to="addTicket">Add Ticket</Link>
      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </div>
  );
};
