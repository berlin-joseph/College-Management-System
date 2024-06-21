const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_image: {
      type: String,
      default: "",
    },
    user_password: {
      type: String,
      required: true,
    },
    user_dob: {
      type: String,
      required: true,
    },
    user_degree: {
      type: String,
      required: true,
    },
    user_department: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["admin", "hod", "staff", "student"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
