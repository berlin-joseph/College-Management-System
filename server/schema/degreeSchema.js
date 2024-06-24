const { default: mongoose } = require("mongoose");

const degreeSchema = new mongoose.Schema(
  {
    degree_id: {
      type: String,
      required: true,
    },
    degree_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const degreeModel = mongoose.model("Degree", degreeSchema);

module.exports = degreeModel;
