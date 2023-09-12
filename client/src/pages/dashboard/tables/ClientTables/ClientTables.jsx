import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ProjectsTable from "../../../../components/dashboardTables/ProjectsTable/ProjectsTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";
import ServicesTable from "../../../../components/dashboardTables/ServicesTable/ServicesTable";

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

  const {
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useQuery(GET_SERVICES);

  if (projectsLoading || servicesLoading) return <Spinner />;
  // if (projectsError || servicesError)
  //   return <p>There was a problem loading the client projects...</p>;

  const projectsArray = projectsData.projects;
  const servicesArray = servicesData.services;

  const client = clientData.client;

  const clientId = clientData.client.id;
  const matchingProjects = projectsArray.filter(
    (project) => project.client.id === clientId
  );

  const matchingServices = servicesArray.filter(
    (service) => service.client.id === clientId
  );

  return (
    <div className="w-full mr-5">
      {/* {!projectsLoading && !projectsError && (
        <ProjectsTable client={client} matchingProjects={matchingProjects} />
      )} */}
      {!servicesLoading && !servicesError && (
        <ServicesTable client={client} matchingServices={matchingServices} />
      )}
    </div>
  );
};

export default ClientTables;
