/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {
  allUser,
  getUser,
  updateUser,
  deleteUser,
  forgetPassword,
  uploadFiles
} = require("./../controller/userController");
const { verifyToken } = require("./../middleware/token/checkToken");
const { updatedUserMW } = require("./../middleware/multer/multer");
// const { generateCode } = require("../middleware/option")
/*------<BODY ROUTE>------*/
router.route("/").get(verifyToken, allUser);

router
  .route("/:id")
  .get(verifyToken, getUser)
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

router.route("/forget-password").put(verifyToken, forgetPassword);

router.route("/files").post(verifyToken, updatedUserMW, uploadFiles);

/*------<EXPORT ROUTE>------*/
module.exports = router;
