import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../../../graphql/queries/projectActivityCommentQueries";

import ProjectCommentFeed from "../../../../components/ProjectCommentFeed/ProjectCommentFeed";
import ProjectHistory from "../../../../components/ProjectHistory/ProjectHistory";

export const ProjectActivity = () => {
  const { projectId } = useParams();

  const {
    loading: projectActivityCommentsLoading,
    error: projectActivityCommentsError,
    data: projectActivityCommentData,
  } = useQuery(GET_PROJECT_ACTIVITY_COMMENTS, { variables: { id: projectId } });

  if (projectActivityCommentsLoading) return <p>Loading...</p>;
  if (projectActivityCommentsError)
    return <p>There was an error loading comments...</p>;

  const matchingProjectActivityComments =
    projectActivityCommentData.projectActivityComments.filter(
      (projectActivityComment) =>
        projectActivityComment.project.id === projectId
    );

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2">
        <ProjectCommentFeed
          projectId={projectId}
          matchingProjectActivityComments={matchingProjectActivityComments}
        />
      </div>
      <div className="w-1/2">
        <ProjectHistory />
      </div>
    </div>
  );
};
