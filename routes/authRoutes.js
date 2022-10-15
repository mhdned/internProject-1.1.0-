/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { register, login } = require("./../controller/authController");
const {
  userValidationRegister,
  userValidationLogin,
} = require("./../middleware/validation/validateUser");
const { createToken } = require("./../middleware/token/checkToken");
/*------<BODY ROUTE>------*/
router.post("/register", userValidationRegister, createToken, register);
router.post("/login", userValidationLogin, createToken, login);
/*------<EXPORT ROUTE>------*/
module.exports = router;
