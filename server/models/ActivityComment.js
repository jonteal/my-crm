const mongoose = require("mongoose");
const moment = require("moment");

// ActivityComment Schema
const activityCommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY [at] hh:mm a"),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const ActivityComment = mongoose.model(
  "ActivityComment",
  activityCommentSchema
);

module.exports = ActivityComment;
