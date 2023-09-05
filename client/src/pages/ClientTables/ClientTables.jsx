import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";
import Spinner from "../../components/Spinner/Spinner";

import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

const ClientTables = () => {
  const { id } = useParams();

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

  console.log("projectsData: ", projectsData);

  if (projectsLoading) return <Spinner />;
  if (projectsError)
    return <p>There was a problem loading the client projects...</p>;
  const projectsArray = projectsData.projects;

  const client = clientData.client;

  const clientId = clientData.client.id;
  const matchingProjects = projectsArray.filter(
    (project) => project.client.id === clientId
  );

  console.log("matchingProjects: ", matchingProjects);

  return (
    <div className="w-full mr-5">
      <ProjectsTable client={client} matchingProjects={matchingProjects} />
    </div>
  );
};

export default ClientTables;
