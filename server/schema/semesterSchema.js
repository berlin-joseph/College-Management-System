const { default: mongoose } = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const semesterModel = mongoose.model("Semester", semesterSchema);
module.exports = semesterModel;
