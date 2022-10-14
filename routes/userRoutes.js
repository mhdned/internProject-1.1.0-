/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {
  allUser,
  getUser,
  updateUser,
  deleteUser,
  forgetPassword,
  updatedUserMW,
  uploadFiles,
} = require("./../controller/userController");
// const { protected } = require("./../middleware/protected");
// const {chargeWallet,updateWallet,} = require("./../controller/walletController");

/*------<BODY ROUTE>------*/
router.route("/").get(allUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.route("/forget-password").put(forgetPassword);

router.route("/files/:id").post(updatedUserMW, uploadFiles);

// router.route("/wallet/:id").post(chargeWallet).patch(updateWallet);

/*------<EXPORT ROUTE>------*/
module.exports = router;
