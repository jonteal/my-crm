import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import ProjectInfoItem from "../../../../components/ProjectInfoItem/ProjectInfoItem";

const ProjectProfile = () => {
  const { projectId } = useParams();

  const rootClass = "project-view";

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error loading project...</p>;

  const {
    title,
    description,
    notes,
    status,
    startDate,
    deadline,
    clientBudget,
    projectEstimate,
  } = projectData.project;

  return (
    <div className={`${rootClass}-main-container px-0 flex flex-col w-full`}>
      <div className="flex flex-row">
        <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-2 w-full">
          {/* <div className={`${rootClass}-btn-container`}>
  <Link to={`/projects/${project.id}/edit`}>
    <SubmitButton className={`${rootClass}-edit-btn`}>
      Edit
    </SubmitButton>
  </Link>
</div> */}
          <div className={`${rootClass}-project-info`}>
            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Title
              </p>
              <h1 className="text-slate-800 font-normal text-left text-2xl">
                {title}
              </h1>
            </div>
            <ProjectInfoItem name="Description" value={description} />
            <ProjectInfoItem name="Notes" value={notes} />
            <ProjectInfoItem name="Status" value={status} />
            <ProjectInfoItem name="Start Date" value={startDate} />
            <ProjectInfoItem name="Deadline" value={deadline} />
            <ProjectInfoItem name="Client Budget" value={clientBudget} />
            <ProjectInfoItem name="Project Estimate" value={projectEstimate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProfile;
