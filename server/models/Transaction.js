const mongoose = require("mongoose");
const moment = require("moment");

const TransactionSchema = new mongoose.Schema({
  paymentParty: {
    type: String,
  },
  amount: {
    type: Number,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  paymentDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  incomingOutgoing: {
    type: String,
    enum: ["Incoming", "Outgoing"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  // Add capability to add PDF file
});

module.exports = mongoose.model("Transaction", TransactionSchema);
