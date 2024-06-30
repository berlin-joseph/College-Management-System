const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_name: {
      type: String,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Degree",
      required: true,
    },
    user_start_year: {
      type: String,
      required: true,
    },
    user_end_year: {
      type: String,
      default: "",
    },
    user_department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: ["admin", "hod", "staff", "student"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
