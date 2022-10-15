/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { register, login } = require("./../controller/authController");
const {
    userValidationRegister,
    userValidationLogin 
} = require("./../middleware/validation/validateUser")
/*------<BODY ROUTE>------*/
router.post("/register",userValidationRegister, register);
router.post("/login",userValidationLogin, login);
/*------<EXPORT ROUTE>------*/
module.exports = router;
