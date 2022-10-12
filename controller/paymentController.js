/*------<INTIATE PAYMENT CONTROLLER>------*/
const User = require("./../model/userModel");
const GeneralValidate = require("./../middleware/validation/validateGeneral");
const asyncHandler = require("express-async-handler");
const Product = require('./../model/productModel')
const Payment = require("./../model/paymentModel");
const Wallet = require("./../model/walletModel");
const {generateCode} = require("./optionController");
const {verifyToken} = require("./../middleware/token/handlerToken");
/*------<MRTHODS PAYMENT CONTROLLER>------*/
exports.buyProductWithWallet = asyncHandler(async(req,res,next)=>{
    const token = await verifyToken(req.headers.authorization);
    const user = await User.findById(token.id)
    if (!user) {
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist"
        })
        res.end();
    }
    prodId = req.params.id;
    currentProd = await Product.findById(prodId);
    if (!currentProd) {
        res.status(404).json({
            result : "c",
            message : "this product does'nt exist"
        })
        res.end();
    }
    userWallet = await Wallet.findOne({userId : user._id});
    if(!userWallet || userWallet.amount < currentProd.price){
        res.status(404).json({
            result : "c",
            message : "this wallet does'nt exist"
        })
        res.end();
    }

    infoPay = req.body;
    infopay = new GeneralValidate(req.body)
    .isExist(['pay','wallet'])
    .isBoolean(['pay','wallet'])
    .isTrue('pay')
    .isTrue('wallet')
    .get()

    const uniqueCode = await generateCode("a","payment");
    if(!uniqueCode){
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist"
        })
        res.end();
    }
    
    const newPay = await Payment.create({
        amount : currentProd.price,
        status : 1,
        walletId : userWallet.id,
        walletAmount : userWallet.amount,
        productId : currentProd._id,
        userId : user._id,
        uniqueKey : uniqueCode,
        productPrice : currentProd.price
    })
    res.status(201).json({
        result : "a",
        data : newPay
    }) 
});
exports.buyProduct = asyncHandler(async(req,res,next)=>{
    const token = await verifyToken(req.headers.authorization);
    const user = await User.findById(token.id)
    if (!user) {
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist"
        })
        res.end();
    }
    prodId = req.params.id;
    currentProd = await Product.findById(prodId);
    if (!currentProd) {
        res.status(404).json({
            result : "c",
            message : "this product does'nt exist"
        })
        res.end();
    }
    infoPay = req.body;
    infopay = new GeneralValidate(req.body)
    .isExist(['pay','wallet'])
    .isBoolean(['pay','wallet'])
    .isTrue('pay')
    .get()

    const newPay = await Payment.create({
        amount : currentProd.price,
        status : 1,
        productId : currentProd._id,
        userId : user._id
    })
    if(!newPay){
        const uniqueCode = await generateCode("c","payment");
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist",
            uniqueCode
        })
        res.end();
    }


    res.status(201).json({
        result : "a",
        data : newPay
    })
});