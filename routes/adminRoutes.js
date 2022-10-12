/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { generateCode } = require("./../controller/optionController");
/*------<BODY ROUTE>------*/
router.get("/date", generateCode);
/*------<EXPORT ROUTE>------*/
module.exports = router;
