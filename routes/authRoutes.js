/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { register, login } = require("./../controller/authController");
/*------<BODY ROUTE>------*/
router.post("/register", register);
router.post("/login", login);
/*------<EXPORT ROUTE>------*/
module.exports = router;
