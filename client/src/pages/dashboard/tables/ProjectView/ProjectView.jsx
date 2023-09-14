import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../../../graphql/queries/projectActivityCommentQueries";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";
import ProjectCommentFeed from "../../../../components/ProjectCommentFeed/ProjectCommentFeed";
// import ProjectViewItem from "../../components/_projects_/ProjectViewItem/ProjectViewItem";

// UTILS
// import { formatCurrency } from "../../utilities/formatCurrency";

import "./projectView.css";

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

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error...</p>;

  if (projectActivityCommentsLoading) return <p>Loading...</p>;
  if (projectActivityCommentsError) return <p>There was an error...</p>;

  const project = projectData.project;

  const projectId = project.id;

  const matchingProjectActivityComments =
    projectActivityCommentData.projectActivityComments.filter(
      (projectActivityComment) =>
        projectActivityComment.project.id === projectId
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
            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Title
              </p>
              <h1 className="text-slate-800 font-normal text-left text-2xl">
                {title}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Description
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {description}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Notes
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {notes}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Status
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {status}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Start Date
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {startDate}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Deadline
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {deadline}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Client Budget
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {clientBudget}
              </h1>
            </div>

            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Project Estimate
              </p>
              <h1 className="text-slate-800 font-normal text-left text-base">
                {projectEstimate}
              </h1>
            </div>
          </div>
        </div>
        <ProjectCommentFeed
          matchingProjectActivityComments={matchingProjectActivityComments}
          projectId={projectId}
        />
      </div>
    </>
  );
};

export default ProjectView;
