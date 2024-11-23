import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix); // Give the file a unique name
  },
});

// // File filter (optional, restrict to images only)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(
//       new Error("Only .jpg, .jpeg, and .png files are allowed!"),
//       false
//     );
//   }
//   cb(null, true);
// };

// Set the limits for file upload (e.g., 5MB)
const upload = multer({
  storage,
  // limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  // fileFilter,
});

export default upload;
