import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ProjectPageCard from "../../../../components/ProjectPageCard/ProjectPageCard";

const ClientProjects = () => {
  const { clientId } = useParams();

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the comment feed</p>;

  const matchingProjects = projectsData.projects.filter(
    (project) => project.client.id === clientId
  );

  return (
    <div className="flex flex-row flex-wrap">
      {matchingProjects.map((project) => (
        <ProjectPageCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ClientProjects;
