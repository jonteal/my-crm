import { FiEdit2 } from "react-icons/fi";

const Comment = ({ comment }) => {
  return (
    <div className="my-4">
      <div
        className="border px-3 py-2  bg-slate-100 rounded-xl flex flex-row justify-between items-center"
        key={comment.id}
      >
        <p className="text-start w-5/6">{comment.commentText}</p>
        <div className="flex justify-end">
          <FiEdit2 />
        </div>
      </div>
      <p className="text-slate-600 text-start text-xs mt-2 ml-2">
        {comment.createdAt}
      </p>
    </div>
  );
};

export default Comment;
