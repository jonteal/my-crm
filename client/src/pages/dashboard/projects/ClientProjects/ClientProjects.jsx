import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ProjectPageCard from "../../../../components/ProjectPageCard/ProjectPageCard";
import AddButton from "../../../../components/reusable/buttons/AddButton/AddButton";

export const ClientProjects = () => {
  const { clientId } = useParams();

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS, {
    variables: { id: { client: { id: clientId } } },
  });

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the comment feed</p>;

  const matchingProjects = projectsData.projects.filter(
    (project) => project.client.id === clientId
  );

  return (
    <div className="flex flex-row flex-wrap">
      {matchingProjects.length === 0 ? (
        <div className="rounded-xl bg-slate-50 mx-2 py-3 px-4 w-full">
          <Link to="/addProject" className="mx-2 mt-4">
            <AddButton>Add Project</AddButton>
          </Link>
          <p className="mt-4">
            This client does not have any current projects.
          </p>
        </div>
      ) : (
        matchingProjects.map((project) => (
          <ProjectPageCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};
