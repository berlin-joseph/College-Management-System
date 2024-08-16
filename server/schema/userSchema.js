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
    user_password: {
      type: String,
      required: true,
    },
    user_image: {
      type: String,
      default: "",
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
    user_department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    user_start_year: {
      type: String,
      required: true,
    },
    user_end_year: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: ["super_admin", "admin", "hod", "staff", "student"],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        default: "",
      },
    ],
    Mark: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mark",
      default: "",
    },
    Leave: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;