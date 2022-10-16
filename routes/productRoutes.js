/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {
  addProduct,
  allProduct,
  deleteProduct,
  oneProduct,
  updateProduct,
  buyProduct
} = require("./../controller/productController");
const {validateProduct,validateUpdateProduct,checkExistProduct}=
    require("./../middleware/validation/validateProduct")
const {validatePayment} = require("./../middleware/validation/validatePayment");
const {verifyToken} = require("./../middleware/token/checkToken");
const {createPayment} = require("./../middleware/payment")
/*------<BODY ROUTE>------*/
router.route("/")
    .get(verifyToken,allProduct)
    .post(verifyToken,validateProduct,addProduct);
router.route("/:id")
    .get(verifyToken,oneProduct)
    .patch(verifyToken,validateUpdateProduct,updateProduct)
    .delete(verifyToken,deleteProduct);
router.route('/buy/:id')
    .post(verifyToken,validatePayment,checkExistProduct,createPayment,buyProduct);
/*------<EXPORT ROUTE>------*/
module.exports = router;
