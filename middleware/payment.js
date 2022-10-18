/*------<REQUIRE MODELS>------*/
const Payment = require("../model/paymentModel");
const Wallet = require('./../model/walletModel');
/*------<REQUIRE HANDLERS>------*/
const asyncHandler = require("express-async-handler");
/*------<CREATE PAYMENT>------*/
exports.createPayment = asyncHandler(async (req, res, next) => {
    try {
        /*------<CHECK PAYMENT WITH WALLET>------*/
        if(req.payType == 'wallet'){
            const wallet = await Wallet.findOne({userId : req.userId});
            req.walletId = wallet._id;
            if(!wallet){
                return res.status(400).send("CLIENT ERROR :: WALLET DOES'NT EXIST | 👮‍♂️");    
            }
        /*------<CHECK AMOUNT WALLET>------*/
            if(wallet.amount < req.prodData.price ){
                return res.status(400).send("CLIENT ERROR :: PLS CHARGE WALLET | 👮‍♂️");    
            }
        /*------<DECREASE WALLET>------*/
            await Wallet.findByIdAndUpdate(req.walletId , {amount : wallet.amount-req.prodData.price});
            const payment = await Payment.create({
                productId : req.params.id, 
                walletId : req.walletId,
                productPrice : req.prodData.price,
                userId : req.userId,
                type : req.payType,
                amount : req.prodData.price
            });
        /*------<CHACK PAYMENT IS CREATE>------*/
            if(!payment){
                return res.status(500).send("SERVER ERROR :: ERROR PAYMENT | 👮‍♂️");    
            }
            req.payment = payment;
            return next();
        }
        /*------<PAYMENT WITHOUT WALLET>------*/
        const payment = await Payment.create({
            productId : req.params.id,
            userId : req.userId,
            type : req.payType,
            productPrice : req.prodData.price,
            amount : req.prodData.price
        });
        /*------<CHACK PAYMENT IS CREATE>------*/
        if(payment){
            req.payment = payment;
            return next()   
        }
        return res.status(409).send("payment not successful");
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
  });