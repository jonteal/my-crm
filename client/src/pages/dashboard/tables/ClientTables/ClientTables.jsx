import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ProjectsContainer from "../../../../components/ProjectsContainer/ProjectsContainer";

// GRAPHQL
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";

const ClientTables = () => {
  const { clientId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  if (projectsLoading || clientLoading) return <Spinner />;
  if (projectsError || clientError)
    return <p>There was a problem loading the client projects...</p>;

  const projectContainers = [
    {
      id: "notStarted",
      state: "Not Started",
    },
    {
      id: "inProgress",
      state: "In Progress",
    },
    {
      id: "completed",
      state: "Completed",
    },
  ];

  const projectsArray = projectsData.projects;

  // const client = clientData.client;

  // const clientId = clientData?.client.id;

  const clientProjects = projectsArray.filter(
    (project) => project.client.id === clientId
  );

  return (
    <div className="w-full mr-5 rounded-xl bg-slate-50 mx-2 mt-1 px-3 py-3">
      <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 text-left">
        Projects
      </h1>
      {projectContainers.map((projectContainer) => (
        <ProjectsContainer
          key={projectContainer.id}
          projectContainer={projectContainer}
          clientProjects={clientProjects}
        />
      ))}
    </div>
  );
};

export default ClientTables;
