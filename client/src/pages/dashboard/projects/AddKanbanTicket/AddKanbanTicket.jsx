import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// import { GET_USERS } from "../../graphql/queries/userQueries";
import { GET_TICKETS } from "../../../../graphql/queries/ticketQueries";
import { ADD_TICKET } from "../../../../graphql/mutations/ticketMutations";
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";

// import "./addTicket.css";

export const AddKanbanTicket = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pre");
  //   const [projectId, setProjectId] = useState("");

  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { title, description, projectId, status },
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

  //   const { loading, error, data } = useQuery(GET_USERS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return alert("Please fill out all fields");
    }

    addTicket(title, description, projectId, status);

    setTitle("");
    setDescription("");
    setStatus("pre");
  };

  //   if (loading) return null;
  //   if (error) return "Something went wrong";

  return (
    <>
      {/* {!loading && !error && ( */}
      <>
        <div id="addTicket" aria-labelledby="addTicket" aria-hidden="true">
          <div>
            <div>
              <div>
                <h1 className="text-lg" id="addTicketLabel">
                  New Ticket
                </h1>
              </div>
              <div className="">
                {/* <div className="mb-3">
                    <label className="form-label">User</label>
                    <select
                      id="userId"
                      className="form-select"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    >
                      <option value="">Select User</option>
                      {data.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName + " " + user.lastName}
                        </option>
                      ))}
                    </select>
                  </div> */}
                <form onSubmit={onSubmit}>
                  <div>
                    <label className="mt-2">Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="name"
                      type="text"
                      className=""
                    />
                    <label className="mt-3">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      className=""
                    ></textarea>
                    <label className="form-label mt-3">Status</label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="pre">Ready</option>
                      <option value="middle">In Progress</option>
                      <option value="old">Done</option>
                    </select>
                  </div>

                  <SubmitButton type="submit">Submit</SubmitButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};
