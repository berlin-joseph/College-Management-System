const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/userController");
const upload = require("../middleware/multerUpload");
const router = express.Router();

router.post("/createUser", upload, createUser);
router.post("/updateUser", upload, updateUser);
router.post("/loginUser", loginUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
