/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {createRequest,allRequest,singleRequest,deleteRequest} = require("./../controller/requestController")
const {verifyToken} = require("./../middleware/token/checkToken")
const {generateCode} = require("./../middleware/option")
/*------<BODY ROUTE>------*/
router.route("/")
  .get(verifyToken,allRequest)
  .post(verifyToken,generateCode,createRequest)

router.route("/:id")
  .get(verifyToken,singleRequest)
  .delete(verifyToken,deleteRequest);
/*------<EXPORT ROUTE>------*/
module.exports = router;
