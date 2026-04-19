const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user ID is required."],
  },
  refreshTokenHash: {
    type: String,
    required: [true, "Refresh Token is required"],
  },
  ip: {
    type: String,
    required: [true, "IP is required"],
  },
  userAgent: {
    type: String,
    required: [true, "UserAgent is required"],
  },
  revoked: {
    type: Boolean,
    default: false,
  },
});

const sessionModel = mongoose.model("sessions", sessionSchema);

module.exports = sessionModel;
