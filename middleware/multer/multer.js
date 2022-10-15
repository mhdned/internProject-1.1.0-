/*------<INTIATE MULTER>------*/
const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // public/doc/users/{{userID}} ==> public/doc/users/456484dsa5d15153sd5/59
    cb(null, "public/doc/users");
  },
  filename: async (req, file, cb) => {
    // userId-year-month-day-{{counter-Random Number}} ==> 456484dsa5d15153sd5-2022-3-20-60
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = `${req.userId}-${Date.now()}-0.${ext}`;
    cb(null, uniqueSuffix);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      res
        .status(401)
        .send("CLIENT ERROR :: PLEASE UPLOAD FILE WITH CORRECT FORMAT"),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.updatedUserMW = upload.single("userFile");
