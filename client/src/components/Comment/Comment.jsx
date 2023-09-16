import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import SubmitButton from "../reusable/buttons/submitButton/SubmitButton";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLIENT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/clientActivityCommentReplyMutations";
import { GET_CLIENT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/clientActivityCommentReplyQueries";
import Spinner from "../reusable/Spinner/Spinner";

const Comment = ({ comment }) => {
  const [addReply, setAddReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const formattedDate = new Date(parseInt(comment.createdAt)).toDateString();

  const commentId = comment.id;

  const [addClientActivityCommentReply] = useMutation(
    ADD_CLIENT_ACTIVITY_COMMENT_REPLY,
    {
      variables: {
        commentText,
        commentId,
      },
      update(cache, { data: { addClientActivityCommentReply } }) {
        const { clientActivityCommentReplies } = cache.readQuery({
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
        });
        cache.writeQuery({
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
          data: {
            clientActivityCommentReplies: [
              ...clientActivityCommentReplies,
              addClientActivityCommentReply,
            ],
          },
        });
      },
    }
  );

  const {
    loading,
    error,
    data: clientActivityCommentReplies,
  } = useQuery(GET_CLIENT_ACTIVITY_COMMENT_REPLIES);

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

  const replies = clientActivityCommentReplies.clientActivityCommentReplies;

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a reply");
    }

    addClientActivityCommentReply(commentText, comment.id);

    setCommentText("");
    setAddReply(false);
  };

  const matchingReplies = replies.filter(
    (reply) => reply.clientActivityComment.id === commentId
  );

  return (
    <div className="my-4 bg-slate-200 p-2 rounded-xl">
      <div
        className="border px-3 py-2 bg-slate-100 rounded-xl flex flex-row justify-between items-center"
        key={comment.id}
      >
        <p className="text-start w-5/6">{comment.commentText}</p>
        <div className="flex justify-end">
          <button>
            <FiEdit2 />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-slate-600 text-start text-xs mt-2 ml-2 mr-3">
          {formattedDate}
        </p>
        <button
          className="text-sm mt-2 text-slate-600"
          onClick={() => setAddReply(!addReply)}
        >
          {addReply ? "Close" : "Reply"}
        </button>
      </div>

      {addReply && (
        <div>
          <form onSubmit={onSubmit}>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-3"
              htmlFor="grid-client-comment"
            >
              Add Reply
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
        </div>
      )}

      {matchingReplies.map((reply) => (
        <>
          <div
            key={reply.id}
            className="border ml-10 mt-2 px-3 py-2 bg-slate-100 rounded-xl flex flex-row justify-between items-center"
          >
            <p>{reply.commentText}</p>
            <div className="flex justify-end">
              <button>
                <FiEdit2 />
              </button>
            </div>
          </div>
          <p className="text-slate-600 text-start text-xs mt-2 mr-3 ml-12">
            {formattedDate}
          </p>
        </>
      ))}
    </div>
  );
};

export default Comment;
