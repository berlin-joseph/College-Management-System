const semesterModel = require("../schema/semesterSchema");

exports.createSemester = async (req, res) => {
  try {
    const { _id, semester } = req.body;
    const Exist = await semesterModel.findOne({ _id });
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
