/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {
  allUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controller/userController");
const { protected } = require("./../middleware/protected");
const {
  chargeWallet,
  updateWallet,
} = require("./../controller/walletController");
/*------<BODY ROUTE>------*/
router.route("/").get(allUser);
router
  .route("/:id")
  .get(getUser)
  .patch(protected, updateUser)
  .delete(protected, deleteUser);

router
  .route("/wallet/:id")
  .post(protected, chargeWallet)
  .patch(protected, updateWallet);

/*------<EXPORT ROUTE>------*/
module.exports = router;
