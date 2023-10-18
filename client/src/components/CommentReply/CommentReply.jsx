import { useMutation } from "@apollo/client";

// ICONS
import { FaRegTrashAlt } from "react-icons/fa";
// import { FiEdit2 } from "react-icons/fi";

// GRAPHQL
import { DELETE_CLIENT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/clientActivityCommentReplyMutations";
import { DELETE_PROJECT_ACTIVITY_COMMENT_REPLY } from "../../graphql/mutations/projectActivityCommentReplyMutations";
import { GET_CLIENT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/clientActivityCommentReplyQueries";
import { GET_PROJECT_ACTIVITY_COMMENT_REPLIES } from "../../graphql/queries/projectActivityCommentReplyQueries";

export const CommentReply = ({ reply, formattedDate, type, commentId }) => {
  const [deleteClientCommentReply] = useMutation(
    DELETE_CLIENT_ACTIVITY_COMMENT_REPLY,
    {
      variables: { id: reply.id },
      refetchQueries: [
        {
          query: GET_CLIENT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        },
      ],
    }
  );

  const [deleteProjectCommentReply] = useMutation(
    DELETE_PROJECT_ACTIVITY_COMMENT_REPLY,
    {
      variables: { id: reply.id },
      refetchQueries: [
        {
          query: GET_PROJECT_ACTIVITY_COMMENT_REPLIES,
          variables: { commentId },
        },
      ],
    }
  );

  const handleCommentDelete = () => {
    if (type === "client") {
      deleteClientCommentReply();
    } else if (type === "project") {
      deleteProjectCommentReply();
    }
  };

  return (
    <>
      <div
        key={reply.id}
        className="border ml-10 mt-2 px-3 py-2 bg-slate-100 rounded-xl flex flex-row justify-between items-center"
      >
        <p>{reply.commentText}</p>
        <div className="flex justify-end">
          {/* <button className="mr-2">
            <FiEdit2 />
          </button> */}
          <button onClick={handleCommentDelete}>
            <FaRegTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
      <p className="text-slate-600 text-start text-xs mt-2 mr-3 ml-12">
        {formattedDate}
      </p>
    </>
  );
};
