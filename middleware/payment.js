const Payment = require("../model/paymentModel");
const asyncHandler = require("express-async-handler");

exports.createPayment = asyncHandler(async (req, res, next) => {
    try {
        let walletId = req.walletId;
        const payment = await Payment.create({
            walletId,
            userId : req.userId,
            type : 'wallet',
            amount : req.body.amount
        });
        if(payment){
            return next()   
        }
        return res.status(409).send("payment not successful");
    } catch (error) {

    }
  });