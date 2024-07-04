const leaveModel = require("../schema/LeaveSchema");
const userModel = require("../schema/userSchema");

exports.createLeave = async (req, res) => {
  try {
    const { sender, receiver, reason } = req.body;

    const leave = await leaveModel.create({
      sender,
      receiver,
      reason,
      status: "Pending",
    });

    return res.status(201).send({
      status: true,
      success: true,
      message: "Leave Created Successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const { id, receiver, status } = req.body;
    const user = await userModel.findById({ _id: receiver });

    if (user.user_type === "staff") {
      const leave = await leaveModel.findByIdAndUpdate(
        { _id: id },
        { status },
        { new: true }
      );
      return res.status(201).send({
        status: false,
        success: false,
        message: "Leave Updated",
        data: leave,
      });
    }
    return res.status(400).send({
      status: true,
      success: false,
      message: `user don't have the rights to update`,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.body;
    const leave = await leaveModel.findByIdAndDelete({ _id: id });
    if (leave) {
      return res.status(200).send({
        status: true,
        success: true,
        message: "Leave Deleted Successfully",
      });
    }
    return res.status(500).send({
      status: true,
      success: false,
      message: "Leave Not Available",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      success: false,
      message: error.message,
    });
  }
};
