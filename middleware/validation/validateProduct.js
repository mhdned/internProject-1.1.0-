const validator = require("validator");
const asyncHandler = require("express-async-handler");
const Product = require("../../model/productModel");
/*------<VALIDATION MIDDLEWARE>------*/
exports.validateProduct = asyncHandler (async (req,res,next)=> {
    try{
        /*------<VALIDATE NEW PRODUCT>------*/
        const newProd = req.body;
        /*------<VALIDATE PRICE PRODUCT>------*/
        if (!newProd.price || newProd.price < 0.0) {
            return res.status(400).send("CLIENT ERROR :: INVALID DATA 1 | 👮‍♂️");
        }
        /*------<VALIDATE CHECK PRODUCT>------*/
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
        /*------<CHECK ADMIN>------*/
        if(req.userData.role !== "admin"){
            return res.status(400).send("CLIENT ERROR :: YOU DONT HAVE ACCESS TO THIS ROUTE | 👮‍♂️");  
        }
        /*------<FIND PRODUCT>------*/
        const product = await Product.findById(req.params.id);
        if(!product || product == undefined){
            return res.status(400).send("CLIENT ERROR :: PRODUCT DOES'NT EXIST | 👮‍♂️");    
        }
        /*------<VALIDATE CHECK PRODUCT>------*/
        if (req.body.price) {
            if(req.body.price < 0.0){
                return res.status(400).send("CLIENT ERROR :: INVALID DATA (PRICE) | 👮‍♂️");
            }
        }
        if(req.body.title){
            if(req.body.title == undefined || req.body.title == ""){
                return res.status(400).send("CLIENT ERROR :: INVALID DATA (TITLE) | 👮‍♂️");
            }
        }
        if(req.body.entities){
            if(req.body.entities < 0){
                return res.status(400).send("CLIENT ERROR :: INVALID DATA (TITLE) | 👮‍♂️");
            }

        }
        /*------<OUTPUT PRODUCT NEW INFO>------*/
        req.prodId = req.params.id;
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
        /*------<FIND PRODUCT>------*/
        const product = await Product.findById(req.params.id);
        /*------<CHECK PRODUCT>------*/
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