// REACT
import { useState } from "react";
import { useParams } from "react-router-dom";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT } from "../../../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../../../graphql/queries/clientQueries";

// COMPONENTS
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";
import "./addClientProject.css";

const rootClass = "add-project";

const AddClientProject = () => {
  const { id: selectedClientId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState(selectedClientId);
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [projectEstimate, setProjectEstimate] = useState("");
  const [alertOn, setAlertOn] = useState(false);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || status === "") {
      setAlertOn(true);
      return (
        <div class="alert alert-danger" role="alert">
          Please provide a title, description, and status!
        </div>
      );
    }

    addProject(
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate
    );

    setTitle("");
    setDescription("");
    setStatus("new");
    setClientId("");
    setStartDate(new Date());
    setDeadline(new Date());
    setNotes("");
    setClientBudget("");
    setProjectEstimate("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div className="w-full bg-slate-50 mx-2 rounded-xl">
      {!loading && !error && (
        <div className={`${rootClass}-container`}>
          {alertOn && (
            <div className="alert alert-danger mt-3" role="alert">
              Please provide a title, description, and status!
            </div>
          )}

          <div className="flex flex-row items-end">
            <div className="flex flex-col justify-center w-1/2 mr-2">
              <label className="form-label client-select block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Client Name
              </label>
              <select
                className="form-select block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                aria-label="Default select option"
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName + " " + client.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-center w-1/2 ml-2">
              <div className="w-full">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Project Status
                </label>
                <select
                  className="form-select block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  aria-label="Project Status select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option aria-label="Project Not Started option" value="new">
                    Not Started
                  </option>
                  <option
                    aria-label="Project In Progress option"
                    value="progress"
                  >
                    In Progress
                  </option>
                  <option
                    aria-label="Project Completed option"
                    value="completed"
                  >
                    Completed
                  </option>
                </select>
              </div>
            </div>
          </div>

          <form class="w-full mt-3" onSubmit={onSubmit}>
            <div class="flex flex-col mb-6">
              <div class="w-full mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-project-title"
                >
                  Title
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-project-title"
                  aria-label="Project Title input"
                  type="text"
                  placeholder="Ex. Company Website"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div class="w-full">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-project-description"
                >
                  Description
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  aria-label="Project description input"
                  //   type="text"
                  rows="3"
                  placeholder="Describe the project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row justify-around -mx-auto mb-6 my-3">
              <div className={`mb-3 ${rootClass}-form-item`}>
                <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Start Date
                </label>
                <DatePicker
                  className="border py-2 px-2 rounded"
                  selected={startDate}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Deadline
                </label>
                <DatePicker
                  className="border py-2 px-2 rounded"
                  selected={deadline}
                  onChange={handleDeadlineChange}
                />
              </div>
            </div>

            <div class="w-full md:w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-project-notes"
              >
                Notes
              </label>
              <textarea
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-project-notes"
                aria-label="Project notes"
                rows="3"
                placeholder="Feel free to write anything here you want"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 my-3">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-client-budget"
                >
                  Budget
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-client-budget"
                  type="text"
                  placeholder="ex. $500"
                  aria-label="Client Budget input"
                  value={clientBudget}
                  onChange={(e) => setClientBudget(e.target.value)}
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-project-estimate"
                >
                  Project Estimate
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-project-estimate"
                  type="text"
                  placeholder="ex. $400"
                  aria-label="Project estimate input"
                  value={projectEstimate}
                  onChange={(e) => setProjectEstimate(e.target.value)}
                />
              </div>
            </div>
            <SubmitButton className="mb-3" type="submit">
              Submit
            </SubmitButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddClientProject;
