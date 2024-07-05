const express = require("express");
const { createSemester } = require("../controller/semesterController");
const router = express.Router();

router.route("/semester").post(createSemester);

module.exports = router;
