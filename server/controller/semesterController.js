const semesterModel = require("../schema/semesterSchema");

exports.createSemester = async (req, res) => {
  try {
    const { semester } = req.body;
    const Exist = await semesterModel.findOne({ semester });
    if (!Exist) {
      const sem = await semesterModel.create({
        semester,
      });
      return res.status(201).send({
        status: true,
        success: true,
        message: `semester created successfully`,
        data: sem,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `${Exist.semester} already available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.getSemester = async (req, res) => {
  try {
    const semester = await semesterModel.find();
    if (semester.length > 0) {
      return res.status(200).send({
        status: true,
        success: true,
        message: "Semester Found Successfully",
        data: semester.map((semester) => ({
          ...semester._doc,
          name: semester.semester,
        })),
      });
    }
    return res.status(404).send({
      status: true,
      success: false,
      message: "Semester Not Available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSemesterById = async (req, res) => {
  try {
    const { _id } = req.body;
    const Exist = await semesterModel.findById({ _id });
    if (Exist) {
      const semester = await semesterModel.findByIdAndDelete({ _id });
      return res.status(201).send({
        status: true,
        success: true,
        message: "Deleted SuccessFully",
      });
    }
    return res.status(404).send({
      status: true,
      success: false,
      message: "Semester Not available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};