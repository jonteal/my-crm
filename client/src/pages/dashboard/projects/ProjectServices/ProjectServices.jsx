import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ServicesTable from "../../../../components/dashboardTables/ServicesTable/ServicesTable";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";
import { InHouseServices } from "../../../../components/dashboardTables/InHouseServices/InHouseServices";

const ProjectServices = () => {
  const { projectId } = useParams();

  const {
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useQuery(GET_SERVICES);

  if (servicesLoading) return <p>Loading...</p>;
  if (servicesError) return <p>There was an error loading services...</p>;

  const matchingServices = servicesData.services.filter(
    (service) => service.project.id === projectId
  );

  return (
    <div className="flex flex-col">
      <ServicesTable
        matchingServices={matchingServices.filter(
          (service) => service.serviceProvider === "Third Party"
        )}
      />
      <InHouseServices
        matchingServices={matchingServices.filter(
          (service) => service.serviceProvider === "In House"
        )}
      />
    </div>
  );
};

export default ProjectServices;
