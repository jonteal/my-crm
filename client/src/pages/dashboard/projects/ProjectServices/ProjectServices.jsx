import { useParams } from "react-router-dom";
import ServicesTable from "../../../../components/dashboardTables/ServicesTable/ServicesTable";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";
import { useQuery } from "@apollo/client";

const ProjectServices = () => {
  const { id } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const {
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useQuery(GET_SERVICES);

  if (servicesLoading) return <p>Loading...</p>;
  if (servicesError) return <p>There was an error loading services...</p>;

  const project = projectData.project;

  const projectId = project.id;

  const matchingServices = servicesData.services.filter(
    (service) => service.project.id === projectId
  );
  return <ServicesTable matchingServices={matchingServices} />;
};

export default ProjectServices;
