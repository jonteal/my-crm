const mongoose = require("mongoose");
const moment = require("moment");

const ServiceSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  cost: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["On", "Off"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
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
