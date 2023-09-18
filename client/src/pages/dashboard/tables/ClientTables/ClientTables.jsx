import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ProjectsTable from "../../../../components/dashboardTables/ProjectsTable/ProjectsTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import ProjectsContainer from "../../../../components/ProjectsContainer/ProjectsContainer";

const ClientTables = () => {
  const { id } = useParams();

  console.log("id: ", id);

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
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

  console.log("clientData: ", clientData);

  const projectsArray = projectsData.projects;

  const client = clientData.client;

  const clientId = clientData?.client.id;

  const clientProjects = projectsArray.filter(
    (project) => project.client.id === clientId
  );

  return (
    <div className="w-full mr-5">
      {projectContainers.map((projectContainer) => (
        <ProjectsContainer
          key={projectContainer.id}
          projectContainer={projectContainer}
          clientProjects={clientProjects}
        />
      ))}
      {/* {!projectsLoading && !projectsError && (
        <ProjectsTable client={client} matchingProjects={matchingProjects} />
      )}
      {!servicesLoading && !servicesError && (
        <ServicesTable client={client} matchingServices={matchingServices} />
      )} */}
    </div>
  );
};

export default ClientTables;
