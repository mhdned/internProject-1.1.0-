/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {allUser,getUser, updateUser,deleteUser} = require("./../controller/userController");
const {protected}= require("./../middleware/protected");
const {chargeWallet} = require("./../controller/walletController")
/*------<BODY ROUTE>------*/
router.route("/")
    .get(allUser);
router.route("/:id")
    .get(getUser)
    .patch(protected,updateUser)
    .delete(protected,deleteUser);

router.route("/wallet/:id")
    .post(protected,chargeWallet);
/*------<EXPORT ROUTE>------*/
module.exports = router;
