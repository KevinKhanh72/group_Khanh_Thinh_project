const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, default: "" },
  city: { type: String, default: "" },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);
