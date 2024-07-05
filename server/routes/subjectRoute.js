const express = require("express");
const {
  createSubject,
  updateSubjectById,
  getSubjectById,
  deleteSubjectById,
} = require("../controller/SubjectController");
const router = express.Router();

router.route("/subject").post(createSubject).put(updateSubjectById);
router.route("/subject/:id").post(getSubjectById).delete(deleteSubjectById);

module.exports = router;
