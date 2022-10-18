/*------<INTIATE PRODUCT CONTROLLER>------*/
const asyncHandler = require("express-async-handler");
const Product = require("./../model/productModel");

/*------<MRTHODS PRODUCT CONTROLLER>------*/
exports.addProduct = asyncHandler(async(req,res,next)=>{
  try {
    if (req.userData.role !== "admin") {
      return res
        .status(403)
        .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
    }
    req.product = await Product.create(req.productInfo);
    res.status(201).json(req.product);
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});
exports.allProduct = asyncHandler(async(req,res,next)=>{
  try{
    /*------<1><RES ALL USERS>------*/
    req.product = await Product.find();
    // .select("-_id");
    res.status(200).json(req.product)
  }catch(error){
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});
exports.oneProduct = asyncHandler(async(req,res,next)=>{
  try {
    let productId = req.params.id;
    req.product = await Product.findById(productId).select("-_id");
    if(!req.product){
      return res.status(400).send("CLIENT ERROR :: THIS PRODUCT DOES NOT EXIST | 🔌");
    }
    res.json(req.product)
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});
exports.updateProduct = asyncHandler(async(req,res,next)=>{
  try {
    if (req.userData.role !== "admin") {
      return res
        .status(403)
        .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
    }
    const product = await Product.findByIdAndUpdate(req.prodId,req.updateProduct,{new:true});
    res.json(product)
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: ... | 🔌");
  }
});
/*----Soft Delete----*/
exports.deleteProduct = asyncHandler(async(req,res,next)=>{
  try {
    
    if(req.userData.role !== "admin"){
      return res.status(401).send("CLIENT ERROR :: YOU DONT HAVE ACCESS TO THIS ROUTE | 👮‍♂️");  
    }
    const prod = await Product.findById(req.params.id);
    if(!prod){
      return res.status(404).send("CLIENT ERROR :: THIS PRODUCT DOES NOT EXIST | 🔌");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(202).send("PRODUCT DELETED | 🗑")
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});

exports.buyProduct = async (req,res) => {
  try {
    res.json({
      payment : req.payment,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
}
