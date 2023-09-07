const mongoose = require("mongoose");
const moment = require("moment");

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
  },
  amount: {
    type: String,
  },
  date: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  // Add capability to add PDF file
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
