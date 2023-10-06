import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";

const CommentReply = ({ reply, formattedDate }) => {
  return (
    <>
      <div
        key={reply.id}
        className="border ml-10 mt-2 px-3 py-2 bg-slate-100 rounded-xl flex flex-row justify-between items-center"
      >
        <p>{reply.commentText}</p>
        <div className="flex justify-end">
          <button className="mr-2">
            <FiEdit2 />
          </button>
          <button>
            <BiDotsVerticalRounded className="text-lg" />
          </button>
        </div>
      </div>
      <p className="text-slate-600 text-start text-xs mt-2 mr-3 ml-12">
        {formattedDate}
      </p>
    </>
  );
};

export default CommentReply;
