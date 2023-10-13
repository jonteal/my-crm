import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { ADD_TICKET } from "../../../../graphql/mutations/ticketMutations";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";

export const AddKanbanTicket = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pre");
  const [blocked, setBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");

  const [addTicket] = useMutation(ADD_TICKET, {
    variables: {
      title,
      description,
      blocked,
      projectId,
      status,
      blockedReason,
    },
    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_TICKETS,
        variables: { projectId },
        data: { tickets: [...tickets, addTicket] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    addTicket(title, description, projectId, status, blocked, blockedReason);

    setTitle("");
    setDescription("");
    setStatus("pre");
    setBlocked(false);
    setBlockedReason("");
  };

  return (
    <div className="bg-slate-50 mt-2 mx-2 p-3 rounded-xl">
      <h1 className="text-lg text-left">New Ticket</h1>
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

            <div class="flex mb-4 flex-col items-start w-full">
              <div className="flex flex-row items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value={blocked}
                  onChange={() => setBlocked(!blocked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
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

          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </div>
    </div>
  );
};
