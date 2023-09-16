const mongoose = require("mongoose");

// projectActivityCommentReply Schema
const projectActivityCommentReplySchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectActivityComment",
  },
});

const ProjectActivityCommentReply = mongoose.model(
  "ProjectActivityCommentReply",
  projectActivityCommentReplySchema
);

module.exports = ProjectActivityCommentReply;
