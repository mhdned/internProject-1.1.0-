/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {protected}= require("./../middleware/protected")
const {buyProductWithWallet} = require("./../controller/paymentController")
/*------<BODY ROUTE>------*/
router.route("/buy/:id")
    .post(protected,buyProductWithWallet);
/*------<EXPORT ROUTE>------*/
module.exports = router;
