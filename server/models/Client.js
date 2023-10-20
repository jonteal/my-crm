const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  companyName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Lead", "Prospect", "Current", "Former", "Cold"],
  },
});

module.exports = mongoose.model("Client", ClientSchema);
