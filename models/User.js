const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: Number, require: true },
  email: { type: String, require: true },
  permission: { type: String, default: "simple" },
});

module.exports = mongoose.model("User", userSchema);
