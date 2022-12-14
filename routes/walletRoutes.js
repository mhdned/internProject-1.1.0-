/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {createWallet,showWallet} = require("./../controller/walletController");
const {verifyToken} = require("./../middleware/token/checkToken");
const {
    validateDataWallet,
    checkWalletExist
} = require("./../middleware/validation/validateWallet")
/*------<BODY ROUTE>------*/
router.route("")
    .get(verifyToken,checkWalletExist,showWallet)
    .put(verifyToken,validateDataWallet,checkWalletExist,createWallet)
/*------<EXPORT ROUTE>------*/
module.exports = router;
