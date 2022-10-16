const validator = require("validator");
const asyncHandler = require("express-async-handler");
const Product = require("../../model/productModel");
/*------<VALIDATION MIDDLEWARE>------*/
exports.validateProduct = asyncHandler (async (req,res,next)=> {
    try{
        const newProd = req.body;
        if (!newProd.price || newProd.price < 0.0) {
            return res.status(400).send("CLIENT ERROR :: INVALID DATA 1 | 👮‍♂️");
        }
        if(!newProd.title ||!newProd.entities || newProd.entities < 0){
            return res.status(400).send("CLIENT ERROR :: INVALID DATA 2 | 👮‍♂️");
        }
        req.productInfo = newProd;       
        next();
    }catch(error){
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
    }
})

exports.validateUpdateProduct = asyncHandler(async (req,res,next)=>{
    try {
        if(req.userData.role !== "admin"){
            return res.status(400).send("CLIENT ERROR :: YOU DONT HAVE ACCESS TO THIS ROUTE | 👮‍♂️");  
        }
        const product = await Product.findById(req.params.id);
        if(!product || product == undefined){
            return res.status(400).send("CLIENT ERROR :: PRODUCT DOES'NT EXIST | 👮‍♂️");    
        }
        req.prodId = req.params.id;
        // WITHOUT VALIDATE
        req.updateProduct = req.body;
        next();
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
    }
})

exports.checkExistProduct = asyncHandler(async (req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product || product == undefined){
            return res.status(400).send("CLIENT ERROR :: PRODUCT DOES'NT EXIST | 👮‍♂️");    
        }
        req.prodId = req.params.id;
        req.prodData = product;
        next();
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
    }
})