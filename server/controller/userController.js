const userModel = require("../schema/userSchema");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const degreeModel = require("../schema/degreeSchema");
const departmentModel = require("../schema/departmentSchema");

// Helper function to delete a file
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${filePath}`);
    }
  });
};

// create user
exports.createUser = async (req, res) => {
  const tempImagePath = req.file ? req.file.path : "";

  try {
    const {
      user_name,
      user_id,
      user_email,
      user_password,
      user_dob,
      user_degree,
      user_department,
      user_type,
      user_start_year,
      user_end_year,
    } = req.body;

    // Check if user already exists by user_id
    const existUser = await userModel.findOne({ user_id });

    // user already exists
    if (existUser) {
      if (tempImagePath) deleteFile(tempImagePath);
      return res.status(400).send({
        status: true,
        success: false,
        message: `User with ID ${user_id} already exists`,
      });
    }

    // Validate degree and department by name
    const degree = await degreeModel.findOne({ degree_name: user_degree });
    if (!degree) {
      if (tempImagePath) deleteFile(tempImagePath);
      return res.status(400).send({
        status: false,
        success: false,
        message: `Degree with name ${user_degree} does not exist`,
      });
    }

    const department = await departmentModel.findOne({
      department_name: user_department,
    });
    if (!department) {
      if (tempImagePath) deleteFile(tempImagePath);
      return res.status(400).send({
        status: false,
        success: false,
        message: `Department with name ${user_department} does not exist`,
      });
    }

    // Prepare final image path
    const userImagePath = tempImagePath
      ? path.join(
          "public/uploads",
          user_type,
          user_degree,
          user_department,
          path.basename(tempImagePath)
        )
      : "";

    // Creating new user
    const user = await userModel.create({
      user_name,
      user_id,
      user_email,
      user_image: userImagePath
        ? `${req.protocol}://${req.get("host")}/${userImagePath}`
        : "",
      user_password: bcryptjs.hashSync(user_password, 10),
      user_dob,
      user_degree: degree._id,
      user_department: department._id,
      user_type,
      user_start_year,
      user_end_year,
    });

    // Move image to final destination if user creation is successful
    if (tempImagePath && user) {
      fs.renameSync(tempImagePath, userImagePath);
    }

    return res.status(201).send({
      status: true,
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (tempImagePath) deleteFile(tempImagePath);
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// Login user -
exports.loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Check if user exists by user_email
    const existUser = await userModel.findOne({
      user_email: user_email,
    });

    if (!existUser) {
      return res.status(400).send({
        status: false,
        success: false,
        message: "User not available",
      });
    }

    // Verify password
    const isMatch = await bcryptjs.compare(
      user_password,
      existUser.user_password
    );
    if (!isMatch) {
      return res.status(401).send({
        status: false,
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a token (assuming you use JWT for authentication)
    const token = jwt.sign(
      {
        userId: existUser._id,
        email: existUser.user_email,
        userType: existUser.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      status: true,
      success: true,
      message: "User logged in successfully",
      data: {
        userId: existUser._id,
        email: existUser.user_email,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  const tempImagePath = req.file ? req.file.path : "";
  try {
    const {
      user_name,
      user_id,
      user_email,
      user_password,
      user_dob,
      user_degree,
      user_department,
      user_type,
    } = req.body;

    // Check if user exists by user_id
    const existUser = await userModel.findOne({ user_id });

    if (!existUser) {
      if (tempImagePath) deleteFile(tempImagePath);
      return res.status(404).send({
        status: true,
        success: false,
        message: "User not available",
      });
    }

    // Delete old image if a new one is uploaded
    let userImagePath = existUser.user_image;
    if (req.file) {
      deleteFile(userImagePath);
      userImagePath = path.join(
        "public/uploads",
        user_type,
        user_degree,
        user_department,
        path.basename(tempImagePath)
      );
    }

    // Update user details
    const updatedUser = await userModel.findOneAndUpdate(
      { user_id },
      {
        user_name,
        user_email,
        user_image: userImagePath,
        user_password,
        user_dob,
        user_degree,
        user_department,
        user_type,
      },
      { new: true }
    );

    // Move image to final destination if user update is successful
    if (tempImagePath && updatedUser) {
      fs.renameSync(tempImagePath, userImagePath);
    }

    return res.status(200).send({
      status: true,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (tempImagePath) deleteFile(tempImagePath);
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;

    // Check if user exists by user_id
    const existUser = await userModel.findById({ _id });

    if (!existUser) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "User not available",
      });
    }

    // Delete user image
    const userImagePath = existUser.user_image;
    if (userImagePath) {
      deleteFile(userImagePath);
    }

    // Delete user from database
    await userModel.deleteOne({ user_id: existUser.user_id });

    return res.status(200).send({
      status: true,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// get user based on user type -
exports.getUserByType = async (req, res) => {
  try {
    const { user_type } = req.body;

    const user = await userModel
      .find({ user_type: user_type })
      .populate("user_degree")
      .populate("user_department");

    if (user) {
      return res.status(200).send({
        status: true,
        success: true,
        message: "User found successfully",
        data: user.map((user) => ({
          ...user._doc,
          name: user.user_name,
        })),
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// get user by Id -
exports.getUserById = async (req, res) => {
  try {
    const { _id } = req.body;
    const existUser = await userModel.findById({ _id });
    if (existUser) {
      return res.status(200).send({
        status: true,
        success: true,
        message: "user found successfully",
        data: existUser,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: "user not available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};