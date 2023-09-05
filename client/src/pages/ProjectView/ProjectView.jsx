import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
// import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";

// COMPONENTS
// import ActivityFeed from "../../components/_activityFeed_/ActivityFeed/ActivityFeed";
// import ProjectViewItem from "../../components/_projects_/ProjectViewItem/ProjectViewItem";

// UTILS
// import { formatCurrency } from "../../utilities/formatCurrency";

import "./projectView.css";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";

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

  //   const {
  //     loading: activityCommentsLoading,
  //     error: activityCommentsError,
  //     data: activityCommentData,
  //   } = useQuery(GET_ACTIVITY_COMMENTS);

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error...</p>;

  //   if (activityCommentsLoading) return <p>Loading...</p>;
  //   if (activityCommentsError) return <p>There was an error...</p>;

  const project = projectData.project;

  const projectId = project.id;

  //   const matchingActivityComments = activityCommentData.activityComments.filter(
  //     (activityComment) => activityComment.project.id === projectId
  //   );

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
      <div className={`${rootClass}-main-container px-20`}>
        <div>
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
      </div>

      {/* <ActivityFeed
        matchingActivityComments={matchingActivityComments}
        projectId={projectId}
      /> */}
    </>
  );
};

export default ProjectView;
