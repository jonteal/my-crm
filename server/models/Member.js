const mongoose = require("mongoose");
const moment = require("moment");

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  companyName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format("MM/DD/YYYY"),
  },
});

module.exports = mongoose.model("Client", ClientSchema);
