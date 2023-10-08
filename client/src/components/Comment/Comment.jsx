import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

// ICONS
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";

// COMPONENTS
import CommentReply from "../CommentReply/CommentReply";
import SubmitButton from "../reusable/buttons/submitButton/SubmitButton";
import Spinner from "../reusable/Spinner/Spinner";

// GRAPHQL
import { ADD_CLIENT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/clientActivityCommentReplyMutations";
import { GET_CLIENT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/clientActivityCommentReplyQueries";
import { GET_CLIENT_ACTIVITY_COMMENTS } from "../../graphql/queries/clientActivityCommentQueries";
import { GET_PROJECT_ACTIVITY_COMMENTS } from "../../graphql/queries/projectActivityCommentQueries";
import { ADD_PROJECT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/projectActivityCommentReplyMutations";
import { GET_PROJECT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/projectActivityCommentReplyQueries";
import { DELETE_PROJECT_ACTIVITY_COMMENT } from "../../graphql/mutations/projectActivityCommentMutations";
import { DELETE_CLIENT_ACTIVITY_COMMENT } from "../../graphql/mutations/clientActivityCommentMutations";

const Comment = ({ comment, type, replies }) => {
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

  const [addProjectActivityCommentReply] = useMutation(
    ADD_PROJECT_ACTIVITY_COMMENT_REPLY,
    {
      variables: {
        commentText,
        commentId,
      },
      update(cache, { data: { addProjectActivityCommentReply } }) {
        const { projectActivityCommentReplies } = cache.readQuery({
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
        });
        cache.writeQuery({
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
          data: {
            projectActivityCommentReplies: [
              ...projectActivityCommentReplies,
              addProjectActivityCommentReply,
            ],
          },
        });
      },
    }
  );

  const {
    loading: clientActivityCommentRepliesLoading,
    error: clientActivityCommentRepliesError,
    data: clientActivityCommentRepliesData,
  } = useQuery(GET_CLIENT_ACTIVITY_COMMENT_REPLIES);

  const {
    loading: projectActivityCommentRepliesLoading,
    error: projectActivityCommentRepliesError,
    data: projectActivityCommentRepliesData,
  } = useQuery(GET_PROJECT_ACTIVITY_COMMENT_REPLIES);

  // NEED TO BREAK UP WHICH MUTATION IS DELETING THE COMMENT. MIGHT NEED TO MAKE ANOTHER COMMENT COMPONENT OR SOMETHING
  const [deleteClientComment] = useMutation(DELETE_CLIENT_ACTIVITY_COMMENT, {
    variables: { id: commentId },
    refetchQueries: [
      { query: GET_CLIENT_ACTIVITY_COMMENTS },
      { query: GET_CLIENT_ACTIVITY_COMMENTS },
    ],
  });

  const [deleteProjectComment] = useMutation(DELETE_PROJECT_ACTIVITY_COMMENT, {
    variables: { id: commentId },
    refetchQueries: [
      { query: GET_PROJECT_ACTIVITY_COMMENTS },
      { query: GET_PROJECT_ACTIVITY_COMMENTS },
    ],
  });

  const handleCommentDelete = () => {
    if (type === "client") {
      deleteClientComment();
      console.log("client comment");
    } else if (type === "project") {
      deleteProjectComment();
      console.log("project comment");
    }
  };

  if (
    clientActivityCommentRepliesLoading ||
    projectActivityCommentRepliesLoading
  )
    return <Spinner />;
  if (clientActivityCommentRepliesError || projectActivityCommentRepliesError)
    return <p>There was an error loading the comment feed</p>;

  const clientCommentReplies =
    clientActivityCommentRepliesData.clientActivityCommentReplies;

  const projectCommentReplies =
    projectActivityCommentRepliesData.projectActivityCommentReplies;

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      alert("You must write a reply");
    }

    if (type === "client") {
      addClientActivityCommentReply(commentText, comment.id);
    } else if (type === "project") {
      addProjectActivityCommentReply(commentText, comment.id);
    }

    setCommentText("");
    setAddReply(false);
  };

  const matchingClientReplies = clientCommentReplies.filter(
    (reply) => reply.clientActivityComment.id === commentId
  );

  const matchingProjectReplies = projectCommentReplies.filter(
    (reply) => reply.projectActivityComment?.id === commentId
  );

  return (
    <div className="my-4 bg-slate-200 p-2 rounded-xl">
      <div
        className="border px-3 py-2 bg-slate-100 rounded-xl flex flex-row justify-between items-center"
        key={comment.id}
      >
        <p className="text-start w-5/6">{comment.commentText}</p>
        <div className="flex justify-end">
          <button className="mr-2">
            <FiEdit2 />
          </button>
          <button onClick={handleCommentDelete}>
            <FaRegTrashAlt className="text-red-500" />
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
              className="border p-2 mb-2 rounded-md appearance-none block w-full bg-slate-50 text-gray-700 border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

      {type === "client"
        ? matchingClientReplies.map((reply) => (
            <CommentReply
              key={reply.id}
              formattedDate={formattedDate}
              reply={reply}
            />
          ))
        : matchingProjectReplies.map((reply) => (
            <CommentReply
              key={reply.id}
              formattedDate={formattedDate}
              reply={reply}
            />
          ))}
    </div>
  );
};

export default Comment;
