const Payment = require("../model/paymentModel");
const Wallet = require('./../model/walletModel');
const asyncHandler = require("express-async-handler");

exports.createPayment = asyncHandler(async (req, res, next) => {
    try {
        if(req.payType == 'wallet'){
            const wallet = await Wallet.findOne({userId : req.userId});
            req.walletId = wallet._id;
            if(!wallet){
                return res.status(400).send("CLIENT ERROR :: WALLET DOES'NT EXIST | 👮‍♂️");    
            }
            if(wallet.amount < req.prodData.price ){
                return res.status(400).send("CLIENT ERROR :: PLS CHARGE WALLET | 👮‍♂️");    
            }
            await Wallet.findByIdAndUpdate(req.walletId , {amount : wallet.amount-req.prodData.price});
            const payment = await Payment.create({
                productId : req.params.id, 
                walletId : req.walletId,
                productPrice : req.prodData.price,
                userId : req.userId,
                type : req.payType,
                amount : req.prodData.price
            });
            if(!payment){
                return res.status(500).send("SERVER ERROR :: ERROR PAYMENT | 👮‍♂️");    
            }
            req.payment = payment;
            return next();
        }
        const payment = await Payment.create({
            productId : req.params.id,
            userId : req.userId,
            type : req.payType,
            productPrice : req.prodData.price,
            amount : req.prodData.price
        });
        if(payment){
            req.payment = payment;
            return next()   
        }
        return res.status(409).send("payment not successful");
    } catch (error) {

    }
  });