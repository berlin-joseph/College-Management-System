const userModel = require("../schema/userSchema");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
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

// Helper function to generate a new token
const generateAccessToken = (user, secret) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.user_email,
      userType: user.user_type,
    },
    secret,
    { expiresIn: "15m" }
  );
};

// Create user
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

    const existUser = await userModel.findOne({ user_id });

    if (existUser) {
      if (tempImagePath) deleteFile(tempImagePath);
      return res.status(400).send({
        status: true,
        success: false,
        message: `User with ID ${user_id} already exists`,
      });
    }

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

    const userImagePath = tempImagePath
      ? path.join(
          "public/uploads",
          user_type,
          user_degree,
          user_department,
          path.basename(tempImagePath)
        )
      : "";

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
      Mark: null,
      Leave: null,
      refresh_token: crypto.randomBytes(64).toString("hex"),
    });

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

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const existUser = await userModel.findOne({ user_email });

    if (!existUser) {
      return res.status(400).send({
        status: false,
        success: false,
        message: "User not available",
      });
    }

    if (user_password) {
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

      const accessToken = generateAccessToken(
        existUser,
        existUser.refresh_token
      );

      return res.status(200).send({
        status: true,
        success: true,
        message: "User logged in successfully",
        data: {
          userId: existUser._id,
          email: existUser.user_email,
          accessToken: accessToken,
        },
      });
    }
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
      accessToken,
    } = req.body;

    const existUser = await userModel.findOne({ user_id });

    if (!existUser) {
      if (tempImagePath) await deleteFile(tempImagePath);
      return res.status(404).send({
        status: true,
        success: false,
        message: "User not available",
      });
    }

    jwt.verify(accessToken, existUser.refresh_token, async (err, decoded) => {
      if (err) {
        if (tempImagePath) await deleteFile(tempImagePath);
        return res.status(403).send({ message: "Invalid token" });
      }

      const accessToken = generateAccessToken(
        existUser,
        existUser.refresh_token
      );

      let userImagePath = existUser.user_image;
      if (req.file) {
        if (userImagePath) await deleteFile(userImagePath);
        userImagePath = path.join(
          "public/uploads",
          user_type,
          user_degree,
          user_department,
          path.basename(tempImagePath)
        );
      }

      const updatedUser = await userModel.findOneAndUpdate(
        { user_id },
        {
          user_name,
          user_email,
          user_image: userImagePath,
          user_password: user_password
            ? bcryptjs.hashSync(user_password, 10)
            : existUser.user_password,
          user_dob,
          user_degree,
          user_department,
          user_type,
        },
        { new: true }
      );

      if (tempImagePath && updatedUser) {
        await fs.rename(tempImagePath, userImagePath);
      }

      return res.status(200).send({
        status: true,
        success: true,
        message: "User updated successfully",
        data: updatedUser,
        accessToken: accessToken,
      });
    });
  } catch (error) {
    if (tempImagePath) await deleteFile(tempImagePath);
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
    const { _id, accessToken } = req.body;

    const existUser = await userModel.findById(_id);

    if (!existUser) {
      return res.status(404).send({
        status: false,
        success: false,
        message: "User not available",
      });
    }

    jwt.verify(accessToken, existUser.refresh_token, async (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Invalid token" });
      }

      const accessToken = generateAccessToken(
        existUser,
        existUser.refresh_token
      );

      const userImagePath = existUser.user_image;
      if (userImagePath) {
        deleteFile(userImagePath);
      }

      await userModel.deleteOne({ user_id: existUser.user_id });

      return res.status(200).send({
        status: true,
        success: true,
        message: "User deleted successfully",
        accessToken: accessToken,
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// Get user based on user type
exports.getUserByType = async (req, res) => {
  try {
    const { user_type } = req.body;

    const users = await userModel
      .find({ user_type })
      .populate("user_degree")
      .populate("user_department");

    if (users.length > 0) {
      return res.status(200).send({
        status: true,
        success: true,
        message: "Users found successfully",
        data: users.map((user) => ({
          ...user._doc,
          name: user.user_name,
        })),
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: "Users not found",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

// Get user by Id
exports.getUserById = async (req, res) => {
  try {
    const { _id, accessToken } = req.body;
    const existUser = await userModel.findById(_id);

    jwt.verify(accessToken, existUser.refresh_token, async (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Invalid token" });
      }

      const accessToken = generateAccessToken(
        existUser,
        existUser.refresh_token
      );

      if (existUser) {
        return res.status(200).send({
          status: true,
          success: true,
          message: "User found successfully",
          data: existUser,
          accessToken: accessToken,
        });
      }
      return res.status(400).send({
        status: true,
        success: false,
        message: "User not available",
      });
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};
