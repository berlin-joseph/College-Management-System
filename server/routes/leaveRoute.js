const express = require("express");
const {
  createLeave,
  updateLeave,
  deleteLeave,
} = require("../controller/LeaveController");

const router = express.Router();

router.route("/leave").post(createLeave).put(updateLeave).delete(deleteLeave);

module.exports = router;
