/*------<INTIATE ROUTE>------*/
const express = require("express");
const router = express.Router();
const {addProduct,allProduct,deleteProduct,oneProduct,updateProduct} = require("./../controller/productController");
const {protected}= require("./../middleware/protected")
/*------<BODY ROUTE>------*/
router.route("/")
    .get(allProduct)
    .post(protected,addProduct);
router.route("/:id")
    .get(oneProduct)
    .patch(protected,updateProduct)
    .delete(protected,deleteProduct);
/*------<EXPORT ROUTE>------*/
module.exports = router;
