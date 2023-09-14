const mongoose = require("mongoose");
const moment = require("moment");

// clientActivityComment Schema
const clientActivityCommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const ClientActivityComment = mongoose.model(
  "ClientActivityComment",
  clientActivityCommentSchema
);

module.exports = ClientActivityComment;
