// REACT
import { useState } from "react";
import { useParams } from "react-router-dom";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_SERVICE } from "../../../../graphql/mutations/serviceMutations";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

const rootClass = "add-project";

const AddClientService = () => {
  const { id: selectedProjectId } = useParams();

  const [service, setService] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("off");
  const [projectId, setProjectId] = useState(selectedProjectId);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [alertOn, setAlertOn] = useState(false);

  const [addService] = useMutation(ADD_SERVICE, {
    variables: {
      service,
      cost,
      projectId,
      status,
      startDate,
      endDate,
    },
    update(cache, { data: { addService } }) {
      const { services } = cache.readQuery({ query: GET_SERVICES });
      cache.writeQuery({
        query: GET_SERVICES,
        data: { services: [...services, addService] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_PROJECTS);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (service === "" || cost === "" || status === "") {
      setAlertOn(true);
      return (
        <div className="alert alert-danger" role="alert">
          Please provide a service name, cost, and status!
        </div>
      );
    }

    addService(service, cost, projectId, status, startDate, endDate);

    setService("");
    setCost("");
    setStatus("off");
    setProjectId(selectedProjectId);
    setStartDate(new Date());
    setEndDate(new Date());
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
                Project Name
              </label>
              <select
                className="form-select block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                aria-label="Default select option"
                id="projectId"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">Select Project</option>
                {data.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
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
                  Service Status
                </label>
                <select
                  className="form-select block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  aria-label="Service Status select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option aria-label="Service Off option" value="off">
                    Off
                  </option>
                  <option aria-label="Service on option" value="on">
                    On
                  </option>
                </select>
              </div>
            </div>
          </div>

          <form className="w-full mt-3" onSubmit={onSubmit}>
            <div className="flex flex-col mb-6">
              <div className="w-full mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-service-name"
                >
                  Service
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-service-name"
                  aria-label="Service name input"
                  type="text"
                  placeholder="Ex. Squarespace"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-service-cost"
                >
                  Cost
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-service-cost"
                  min="0.01"
                  step="0.01"
                  type="number"
                  placeholder="ex. 200"
                  aria-label="Invoice Amount input"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>

            <div classNameName="flex flex-row justify-around -mx-auto mb-6 my-3">
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
                  EndDate
                </label>
                <DatePicker
                  className="border py-2 px-2 rounded"
                  selected={endDate}
                  onChange={handleEndDateChange}
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

export default AddClientService;
