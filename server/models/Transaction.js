const mongoose = require("mongoose");
const moment = require("moment");

const TransactionSchema = new mongoose.Schema({
  paymentParty: {
    type: String,
  },
  amount: {
    type: String,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
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
