const { default: mongoose } = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subject_name: {
      type: String,
      required: true,
    },
    degree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Degree",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

const subjectModel = mongoose.model("Subject", subjectSchema);
module.exports = subjectModel;
