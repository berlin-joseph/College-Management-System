const { default: mongoose } = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    department_id: {
      type: String,
      required: true,
    },
    department_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const departmentModel = mongoose.model("Department", departmentSchema);

module.exports = departmentModel;
