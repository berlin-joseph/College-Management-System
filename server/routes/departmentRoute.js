const express = require("express");
const {
  createDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
  getDepartmentsByDegree,
} = require("../controller/departmentController");

const router = express.Router();

router.route("/department").post(createDepartment).get(getDepartment);
router.route("/getDepartmentByDegree").post(getDepartmentsByDegree);
router
  .route("/department/:id")
  .post(getDepartmentById)
  .put(updateDepartmentById)
  .delete(deleteDepartmentById);

module.exports = router;
