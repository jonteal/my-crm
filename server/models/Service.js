const mongoose = require("mongoose");
const moment = require("moment");

const ServiceSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  cost: {
    type: Number,
  },
  notes: {
    type: String,
  },
  paymentSchedule: {
    type: String,
    enum: ["Weekly", "Monthly", "Yearly", "Per Instance"],
  },
  status: {
    type: String,
    enum: ["On", "Off"],
  },
  inHouse: {
    type: String,
    enum: ["In House", "Third Party"],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  startDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  endDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
