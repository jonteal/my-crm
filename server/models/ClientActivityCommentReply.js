const mongoose = require("mongoose");

// clientActivityCommentReply Schema
const clientActivityCommentReplySchema = new mongoose.Schema({
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
    ref: "ClientActivityComment",
  },
});

const ClientActivityCommentReply = mongoose.model(
  "ClientActivityCommentReply",
  clientActivityCommentReplySchema
);

module.exports = ClientActivityCommentReply;
