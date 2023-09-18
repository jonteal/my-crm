const mongoose = require("mongoose");
const moment = require("moment");

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  // Add capability to add PDF file
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
