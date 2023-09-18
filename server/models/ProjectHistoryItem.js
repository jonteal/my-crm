const mongoose = require("mongoose");
const moment = require("moment");

// projectHistoryItem Schema
const projectHistoryItemSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const ProjectHistoryItem = mongoose.model(
  "ProjectHistoryItem",
  projectHistoryItemSchema
);

module.exports = ProjectHistoryItem;
