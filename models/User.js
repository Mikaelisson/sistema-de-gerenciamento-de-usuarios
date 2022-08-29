const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  office: { type: String, required: true },
  permission: { type: String, default: "simple" },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
