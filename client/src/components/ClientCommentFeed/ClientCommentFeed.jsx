import { useState } from "react";

// LIBRARIES
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT_ACTIVITY_COMMENT } from "../../graphql/mutations/clientActivityCommentMutations";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../graphql/queries/clientActivityCommentQueries";

// COMPONENTS
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import { Comment } from "../Comment/Comment";

export const ClientCommentFeed = ({ clientId, comments }) => {
  const [commentText, setCommentText] = useState("");

  const [addClientActivityComment] = useMutation(ADD_CLIENT_ACTIVITY_COMMENT, {
    variables: {
      commentText,
      clientId,
    },
    update(cache, { data: { addClientActivityComment } }) {
      const { clientActivityComments } = cache.readQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
        variables: { clientId },
        data: {
          clientActivityComments: [
            ...clientActivityComments,
            addClientActivityComment,
          ],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a comment");
    }

    addClientActivityComment(commentText, clientId);

    setCommentText("");
  };

  return (
    <div className="rounded-xl bg-slate-50 mx-2 px-3 mt-1 w-full">
      <form onSubmit={onSubmit}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-3"
          htmlFor="grid-client-comment"
        >
          Client Activity Feed
        </label>
        <textarea
          id="grid-client-comment"
          type="text"
          aria-label="Comment input"
          placeholder="Write a comment"
          className="border p-2 mb-2 rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="w-1/2 text-left mt-2">
          <DynamicButton color="red" type="submit">
            Submit
          </DynamicButton>
        </div>
      </form>

      <div className="mt-5 pb-2">
        {comments
          // .sort(function (a, b) {
          //   return new Date(b.createdAt) - new Date(a.createdAt);
          // })
          .map((comment) => (
            <Comment type="client" key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};
