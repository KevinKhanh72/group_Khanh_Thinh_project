import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email:  { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role:   { type: String, enum: ["user","admin"], default: "user" },
  avatar: { type: String, default: "" }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model("User", userSchema);
