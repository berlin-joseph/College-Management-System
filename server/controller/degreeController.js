const degreeModel = require("../schema/degreeSchema");

exports.createDegree = async (req, res) => {
  try {
    const { degree_id, degree_name } = req.body;
    const exist = await degreeModel.findOne({ degree_id });
    if (!exist) {
      const department = await degreeModel.create({
        degree_id,
        degree_name,
      });
      return res.status(201).send({
        status: true,
        success: true,
        message: `${degree_name} created successfully`,
        data: department,
      });
    }

    return res.status(400).send({
      status: true,
      success: false,
      message: `${exist.degree_name} already available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.getDegree = async (req, res) => {
  try {
    const degrees = await degreeModel.find();
    if (degrees) {
      return res.status(200).send({
        status: true,
        success: true,
        message: `Degrees fetched successfully`,
        data: degrees.map((degree) => ({
          ...degree._doc,
          name: degree.degree_name,
        })),
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `No degrees available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};


exports.getDegreeById = async (req, res) => {
  const { _id } = req.body;

  try {
    const degree = await degreeModel.findById({ _id });

    if (degree) {
      return res.status(200).send({
        status: true,
        success: true,
        message: `degree fetch successfully`,
        data: degree,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `degree not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.updateDegreeById = async (req, res) => {
  try {
    const { _id, degree_id, degree_name } = req.body;

    const exist = await degreeModel.findById({ _id });

    if (exist) {
      const degree = await degreeModel.findByIdAndUpdate(
        _id,
        {
          degree_id,
          degree_name,
        },
        { new: true, runValidators: true }
      );
      return res.status(200).send({
        status: true,
        success: true,
        message: `degree updated successfully`,
        data: degree,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `degree not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteDegreeById = async (req, res) => {
  try {
    const { _id, degree_id, degree_name } = req.body;

    const exist = await degreeModel.findById({ _id });

    if (exist) {
      const degree = await degreeModel.findByIdAndDelete(_id);

      return res.status(200).send({
        status: true,
        success: true,
        message: `degree deleted successfully`,
        data: degree,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `degree not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};
