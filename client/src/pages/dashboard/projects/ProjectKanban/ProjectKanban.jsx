import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { StatusColumn } from "../../../../components/kanban/StatusColumn/StatusColumn";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import AddButton from "../../../../components/reusable/buttons/AddButton/AddButton";

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
      <div className="mt-2">
        <Link to="addTicket">
          <AddButton>Add Ticket</AddButton>
        </Link>
      </div>
      <StatusColumn statusColumns={statusColumns} ticketData={ticketData} />
    </div>
  );
};
