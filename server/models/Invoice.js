const mongoose = require("mongoose");
const moment = require("moment");

const InvoiceSchema = new mongoose.Schema({
  date: {
    type: String,
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
  amount: {
    type: String,
  },
  invoiceNumber: {
    type: String,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  // Add capability to add PDF file
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
