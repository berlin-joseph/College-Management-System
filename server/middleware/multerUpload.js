const multer = require("multer");
const fs = require("fs");
const path = require("path");

const fileType = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = fileType[file.mimetype];
    let uploadError = new Error("Invalid Upload Format");

    if (isValid) {
      uploadError = null;
    }

    // Set the destination folder dynamically based on req.body
    const folderPath = path.join(
      "public/uploads",
      req.body.user_type,
      req.body.user_degree,
      req.body.user_department
    );
    fs.mkdirSync(folderPath, { recursive: true });
    cb(uploadError, folderPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = fileType[file.mimetype];
    cb(null, `${fileName}-(${req.body.user_id}).${extension}`);
  },
});

// Export the multer upload middleware to accept 'user_image' field
const upload = multer({ storage: storage }).single("user_image");

module.exports = upload;
