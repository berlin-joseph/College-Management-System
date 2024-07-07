const express = require("express");
const {
  createSemester,
  getSemester,
  deleteSemesterById,
} = require("../controller/semesterController");
const router = express.Router();

router.route("/semester").post(createSemester).get(getSemester);
router.route("/semester/:id").delete(deleteSemesterById);

module.exports = router;
