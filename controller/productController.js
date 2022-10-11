/*------<INTIATE PRODUCT CONTROLLER>------*/
const User = require("./../model/productModel");
const asyncHandler = require("express-async-handler");
const ProdValidate = require("./../middleware/validation/validateProd");
const Product = require("./../model/productModel");
const { createToken } = require("../middleware/token/handlerToken");
/*------<MRTHODS PRODUCT CONTROLLER>------*/
exports.addProduct = asyncHandler(async(req,res,next)=>{
    const newProd = req.body;
    const valideProd = new ProdValidate(newProd)
    .isExist(['title','price','entities'])
    .isGT('price')
    .get();
    if (!valideProd) {
        res.status(401).json({
            status: "c",
            messages: "Invalid Data",
            data: valideProd,
          });
          res.end();
    }
    /*------<2><CREATE DATA>------*/
    const prod = await Product.create(valideProd);
    const token = createToken(prod._id);
    /*------<3><RESPONSE DATA>------*/
    res.status(201).json({
    status: "a",
    token,
    data: prod,
    });
});
exports.allProduct = asyncHandler(async(req,res,next)=>{
    /*------<1><RES ALL USERS>------*/
    const prod = await Product.find();
    res.status(200).json({
    status : "OK",
    data : prod
    })
});
/*----Need ID----*/
exports.oneProduct = asyncHandler(async(req,res,next)=>{
    const prodId = req.params.id;
    if (!prodId) {
      res.status(404).json({
        status : "c",
        message : "id parameter is required"
      })
    }
    const prod = await Product.findById(prodId);
    res.status(200).json({
      status : "a",
      data : prod
    })
});
exports.updateProduct = asyncHandler(async(req,res,next)=>{
    const prodId = req.params.id;
    const newInfo = req.body;
    if (!prodId) {
      res.status(404).json({
        status : "c",
        message : "id parameter is required"
      })
    }
    const prod = await Product.findByIdAndUpdate(prodId,newInfo,{new: true});
    res.status(200).json({
      status : "a",
      data : prod
    })
});
/*----Soft Delete----*/
exports.deleteProduct = asyncHandler(async(req,res,next)=>{
    const prodId = req.params.id;
    if (!prodId) {
      res.status(404).json({
        status : "c",
        message : "id parameter is required"
      })
    }
    await Product.findByIdAndDelete(prodId);
    res.status(204)
    res.end()
});
