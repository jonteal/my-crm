import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import {
  GET_TICKET,
  GET_TICKETS,
} from "../../../../graphql/queries/ticketQueries";
import { UPDATE_TICKET } from "../../../../graphql/mutations/ticketMutations";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";

export const EditKanbanTicket = () => {
  const { projectId, ticketId } = useParams();

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const ticket = ticketData?.ticket;

  const [title, setTitle] = useState(ticket?.title);
  const [description, setDescription] = useState(ticket?.description);
  const [status, setStatus] = useState(ticket?.status);
  const [blocked, setBlocked] = useState(ticket?.blocked);
  const [blockedReason, setBlockedReason] = useState(ticket?.blockedReason);

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: {
      id: ticketId,
      title,
      description,
      blocked,
      projectId,
      status,
      blockedReason,
    },
    refetchQueries: [{ query: GET_TICKET, variables: { ticketId } }],

    update(cache, { data: { updateTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { projectId },
        data: { tickets: [...tickets, updateTicket] },
      });
    },
  });

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    updateTicket(
      ticketId,
      title,
      description,
      projectId,
      status,
      blocked,
      blockedReason
    );
  };

  return (
    <div className="bg-slate-50 mt-2 mx-2 p-3 rounded-xl">
      <h1 className="text-lg text-left">Update Ticket</h1>
      <div className="">
        <form onSubmit={onSubmit}>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="name"
              type="text"
              placeholder="Name of the ticket"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-notes"
              aria-label="Ticket description section"
              //   type="text"
              rows="3"
              placeholder="Description about this ticket"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-4">
              Status
            </label>
            <select
              id="status"
              className="form-select mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pre">Ready</option>
              <option value="middle">In Progress</option>
              <option value="old">Done</option>
            </select>

            <div className="flex mb-4 flex-col items-start w-full">
              <div className="flex flex-row items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={blocked}
                  onChange={() => setBlocked(!blocked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is this story blocked?
                </label>
              </div>
              {blocked && (
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-notes"
                    aria-label="Blocked reason section"
                    //   type="text"
                    rows="3"
                    placeholder="Reason the story is blocked"
                    value={blockedReason}
                    onChange={(e) => setBlockedReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <DynamicButton type="submit">Submit</DynamicButton>
        </form>
      </div>
    </div>
  );
};
