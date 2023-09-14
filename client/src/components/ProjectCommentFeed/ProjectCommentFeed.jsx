import { useState } from "react";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import SubmitButton from "../reusable/buttons/submitButton/SubmitButton";
import Spinner from "../reusable/Spinner/Spinner";
import Comment from "../Comment/Comment";

const ProjectCommentFeed = ({ projectId, matchingProjectActivityComments }) => {
  const [commentText, setCommentText] = useState("");

  const [addProjectActivityComment] = useMutation(
    ADD_PROJECT_ACTIVITY_COMMENT,
    {
      variables: {
        commentText,
        projectId,
      },
      update(cache, { data: { addProjectActivityComment } }) {
        const { projectActivityComments } = cache.readQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
        });
        cache.writeQuery({
          query: GET_PROJECT_ACTIVITY_COMMENTS,
          data: {
            projectActivityComments: [
              ...projectActivityComments,
              addProjectActivityComment,
            ],
          },
        });
      },
    }
  );

  const { loading, error, data } = useQuery(GET_PROJECTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a comment");
    }

    addProjectActivityComment(commentText, projectId);

    setCommentText("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
          htmlFor="grid-project-comment"
        >
          Project Activity Feed
        </label>
        <textarea
          id="grid-project-comment"
          type="text"
          aria-label="Comment input"
          placeholder="Write a comment"
          className="border p-2 mb-2 rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="w-1/2 text-left mt-2">
          <SubmitButton type="submit">Save</SubmitButton>
        </div>
      </form>

      <div className="mt-5">
        {matchingProjectActivityComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCommentFeed;
