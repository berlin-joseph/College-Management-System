const degreeModel = require("../schema/degreeSchema");
const departmentModel = require("../schema/departmentSchema");

exports.createDepartment = async (req, res) => {
  try {
    const { department_id, department_name, degree } = req.body;
    const exist = await departmentModel.findOne({ department_id });
    if (!exist) {
      const fetchDegree = await degreeModel.findOne({
        degree_name: degree,
      });
      if (fetchDegree) {
        const department = await departmentModel.create({
          department_id,
          department_name,
          degree: fetchDegree._id,
        });
        return res.status(201).send({
          status: true,
          success: true,
          message: `${department_name} created successfully`,
          data: department,
        });
      }
      return res.status(400).send({
        status: true,
        success: false,
        message: `Degree Not Available`,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `${exist.department_name} already available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department = await departmentModel.find();
    if (department) {
      return res.status(200).send({
        status: true,
        success: true,
        message: `department fetch successfully`,
        data: department.map((department) => ({
          ...department._doc,
          name: department.department_name,
        })),
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `department not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  const { _id } = req.body;

  try {
    const department = await departmentModel.findById({ _id });

    if (department) {
      return res.status(200).send({
        status: true,
        success: true,
        message: `department fetch successfully`,
        data: department,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `department not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.updateDepartmentById = async (req, res) => {
  try {
    const { _id, department_id, department_name, degree } = req.body;

    const exist = await departmentModel.findById({ _id });

    if (exist) {
      const department = await departmentModel.findByIdAndUpdate(
        _id,
        {
          department_id,
          department_name,
          degree,
        },

        { new: true, runValidators: true }
      );
      return res.status(200).send({
        status: true,
        success: true,
        message: `department updated successfully`,
        data: department,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `department not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteDepartmentById = async (req, res) => {
  try {
    const { _id, department_id, department_name } = req.body;

    const exist = await departmentModel.findById({ _id });

    if (exist) {
      const department = await departmentModel.findByIdAndDelete(_id);

      return res.status(200).send({
        status: true,
        success: true,
        message: `department deleted successfully`,
        data: department,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `department not available`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.getDepartmentsByDegree = async (req, res) => {
  try {
    const { degree_name } = req.body;

    const degree = await degreeModel.findOne({ degree_name });

    if (!degree) {
      return res.status(400).send({
        status: true,
        success: false,
        message: `Degree not available`,
      });
    }

    const departments = await departmentModel.find({ degree: degree._id });

    if (departments.length > 0) {
      return res.status(200).send({
        status: true,
        success: true,
        message: `Departments fetched successfully`,
        data: departments.map((department) => ({
          ...department._doc,
          name: department.department_name,
        })),
      });
    }

    return res.status(400).send({
      status: true,
      success: false,
      message: `No departments available for the given degree`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};
