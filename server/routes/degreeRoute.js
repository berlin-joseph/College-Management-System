const express = require("express");
const {
  createDegree,
  getDegree,
  getDegreeById,
  updateDegreeById,
  deleteDegreeById,
} = require("../controller/degreeController");
const router = express.Router();

router.route("/degree").post(createDegree).get(getDegree);
router
  .route("/degree/:id")
  .post(getDegreeById)
  .put(updateDegreeById)
  .delete(deleteDegreeById);

module.exports = router;
