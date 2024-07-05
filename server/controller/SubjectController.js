const degreeModel = require("../schema/degreeSchema");
const departmentModel = require("../schema/departmentSchema");
const semesterModel = require("../schema/semesterSchema");
const subjectModel = require("../schema/subjectSchema");

//
exports.createSubject = async (req, res) => {
  try {
    const { subject_name, semester, degree, department } = req.body;
    const Exist = await subjectModel.findOne({ subject_name });
    if (!Exist) {
      const fetchDegree = await degreeModel.findById({ _id: degree });
      if (fetchDegree) {
        const fetchDepartment = await departmentModel.findById({
          _id: department,
        });
        if (fetchDepartment) {
          const fetchSemester = await semesterModel.findById({ _id: semester });
          if (fetchSemester) {
            const subject = await subjectModel.create({
              subject_name,
              degree,
              department,
              semester,
            });
            return res.status(201).send({
              status: true,
              success: true,
              message: "Subject created successfully",
              data: subject,
            });
          }
          return res.status(201).send({
            status: false,
            success: false,
            message: "Semester Not Available",
          });
        }
        return res.status(404).send({
          status: false,
          success: false,
          message: "Department Not Available",
        });
      }
      return res.status(404).send({
        status: false,
        success: false,
        message: "Degree Not Available",
      });
    }
    return res.status(404).send({
      status: true,
      success: false,
      message: `${subject_name} already available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

//
exports.updateSubjectById = async (req, res) => {
  try {
    const { _id, subject_name, degree, department, semester } = req.body;
    const Exist = await subjectModel.findById({ _id });
    if (Exist) {
      const subject = await subjectModel.findByIdAndUpdate(
        { _id },
        { subject_name, degree, department, semester },
        { new: true }
      );
      return res.status(201).send({
        status: true,
        success: true,
        message: "Subject Updated Successfully",
        data: subject,
      });
    }
    return res.status(404).send({
      status: true,
      success: false,
      message: "Subject Not Available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

//
exports.getSubjectById = async (req, res) => {
  try {
    const { _id } = req.body;

    const Exist = await subjectModel.findById({ _id });
    if (Exist) {
      const subject = await subjectModel
        .findById({ _id })
        .populate("degree")
        .populate("department")
        .populate("semester");
      return res.status(404).send({
        status: false,
        success: false,
        message: "Subject Found Successfully",
        data: subject,
      });
    }
    return res.status(404).send({
      status: false,
      success: false,
      message: "Subject Not Available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

//
exports.deleteSubjectById = async (req, res) => {
  try {
    const { _id } = req.body;

    const Exist = await subjectModel.findById({ _id });
    if (Exist) {
      await subjectModel.findByIdAndDelete({ _id });

      return res.status(404).send({
        status: false,
        success: false,
        message: "Subject Deleted Successfully",
      });
    }
    return res.status(404).send({
      status: false,
      success: false,
      message: "Subject Not Available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};
