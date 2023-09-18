import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../../../graphql/queries/projectActivityCommentQueries";
import { GET_SERVICES } from "../../../../graphql/queries/serviceQueries";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";
import ProjectCommentFeed from "../../../../components/ProjectCommentFeed/ProjectCommentFeed";
// import ProjectViewItem from "../../components/_projects_/ProjectViewItem/ProjectViewItem";

// UTILS
// import { formatCurrency } from "../../utilities/formatCurrency";

import ServicesTable from "../../../../components/dashboardTables/ServicesTable/ServicesTable";
import "./projectView.css";
import ProjectInfoItem from "../../../../components/ProjectInfoItem/ProjectInfoItem";

const rootClass = "project-view";

const ProjectView = () => {
  const { id } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const {
    loading: projectActivityCommentsLoading,
    error: projectActivityCommentsError,
    data: projectActivityCommentData,
  } = useQuery(GET_PROJECT_ACTIVITY_COMMENTS);

  const {
    loading: servicesLoading,
    error: servicesError,
    data: servicesData,
  } = useQuery(GET_SERVICES);

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error loading project...</p>;

  if (servicesLoading) return <p>Loading...</p>;
  if (servicesError) return <p>There was an error loading services...</p>;

  if (projectActivityCommentsLoading) return <p>Loading...</p>;
  if (projectActivityCommentsError)
    return <p>There was an error loading comments...</p>;

  const project = projectData.project;

  const projectId = project.id;

  const matchingProjectActivityComments =
    projectActivityCommentData.projectActivityComments.filter(
      (projectActivityComment) =>
        projectActivityComment.project.id === projectId
    );

  const matchingServices = servicesData.services.filter(
    (service) => service.project.id === projectId
  );

  const {
    title,
    description,
    notes,
    status,
    startDate,
    deadline,
    clientBudget,
    projectEstimate,
  } = project;

  return (
    <>
      <div className={`${rootClass}-main-container px-3 flex flex-row w-full`}>
        <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-3 w-full">
          {/* <div className={`${rootClass}-btn-container`}>
            <Link to={`/projects/${project.id}/edit`}>
              <SubmitButton className={`${rootClass}-edit-btn`}>
                Edit
              </SubmitButton>
            </Link>
          </div> */}
          <div className={`${rootClass}-project-info`}>
            <ProjectInfoItem name="Title" value={title} />
            <ProjectInfoItem name="Description" value={description} />
            <ProjectInfoItem name="Notes" value={notes} />
            <ProjectInfoItem name="Status" value={status} />
            <ProjectInfoItem name="Start Date" value={startDate} />
            <ProjectInfoItem name="Deadline" value={deadline} />
            <ProjectInfoItem name="Client Budget" value={clientBudget} />
            <ProjectInfoItem name="Project Estimate" value={projectEstimate} />
          </div>
        </div>
        <ProjectCommentFeed
          matchingProjectActivityComments={matchingProjectActivityComments}
          projectId={projectId}
        />
        <ServicesTable matchingServices={matchingServices} />
      </div>
    </>
  );
};

export default ProjectView;
