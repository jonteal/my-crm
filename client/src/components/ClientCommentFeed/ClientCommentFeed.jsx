import { useState } from "react";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT_ACTIVITY_COMMENT } from "../../graphql/mutations/clientActivityCommentMutations";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../graphql/queries/clientActivityCommentQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import SubmitButton from "../reusable/buttons/submitButton/SubmitButton";
import Spinner from "../reusable/Spinner/Spinner";
import Comment from "../Comment/Comment";

const ClientCommentFeed = ({ clientId, matchingClientActivityComments }) => {
  const [commentText, setCommentText] = useState("");

  const [addClientActivityComment] = useMutation(ADD_CLIENT_ACTIVITY_COMMENT, {
    variables: {
      commentText,
      clientId,
    },
    update(cache, { data: { addClientActivityComment } }) {
      const { clientActivityComments } = cache.readQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
      });
      cache.writeQuery({
        query: GET_CLIENT_ACTIVITY_COMMENTS,
        data: {
          clientActivityComments: [
            ...clientActivityComments,
            addClientActivityComment,
          ],
        },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a comment");
    }

    addClientActivityComment(commentText, clientId);

    setCommentText("");
  };

  // matchingClientActivityComments.sort(function (a, b) {
  //   return new Date(b.date) - new Date(a.date);
  // });

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

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
          <SubmitButton type="submit">Save</SubmitButton>
        </div>
      </form>

      <div className="mt-5 pb-2">
        {matchingClientActivityComments
          .sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
          .map((comment) => (
            <Comment type="client" key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default ClientCommentFeed;
