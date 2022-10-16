/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const { verifyToken } = require("./../../middleware/token/checkToken");
const {generateCode} = require("./../../middleware/option")
const {allRequests,changeRequestStatus,deleteRequest,singleRequest} = require("./../../controller/adminController")
/*------<BODY ROUTE>------*/
router.route("/request")
    .get(verifyToken,allRequests);
router.route("/request/:id")
    .get(verifyToken,singleRequest)
    .put(verifyToken,generateCode,changeRequestStatus)
    .delete(verifyToken,deleteRequest);
/*------<EXPORT ROUTE>------*/
module.exports = router;
