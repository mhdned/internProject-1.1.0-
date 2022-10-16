/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { register, login } = require("./../controller/authController");
const {
  userValidationRegister,
  userValidationLogin,
} = require("./../middleware/validation/validateUser");
const { createToken,verifyToken } = require("./../middleware/token/checkToken");
const { generateCode } = require("../middleware/option")
/*------<BODY ROUTE>------*/
router.post("/register", userValidationRegister, createToken, register);
router.post("/login", userValidationLogin, createToken, login);

router.route("/help")
  .get(verifyToken,generateCode);

/*------<EXPORT ROUTE>------*/
module.exports = router;
