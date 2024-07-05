const { default: mongoose } = require("mongoose");

const markSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const markModel = mongoose.model(markSchema);

module.exports = markModel;
