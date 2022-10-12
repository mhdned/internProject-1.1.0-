/*------<INTIATE WALLET CONTROLLER>------*/
const User = require("./../model/userModel");``
const Wallet = require("./../model/walletModel");
const Payment = require("./../model/paymentModel");
const {generateCode} = require("./optionController");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS WALLET CONTROLLER>------*/
exports.chargeWallet = asyncHandler(async(req,res,next)=>{
    /*---<Validate user with id parameter>---*/
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json({
            result : "c",
            data : "user not found"
        })
        res.end();
    }

    const uniqueCode = await generateCode("a","wallet-charge");
    if(!uniqueCode){
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist"
        })
        res.end();
    }

    req.body.userId = userId;
    req.body.uniqueKey = uniqueCode;

    if(await Wallet.findOne({userId : userId})){
        res.status(404).json({
            result : "c",
            message : "this user have a wallet"
        })
        res.end();
        throw new Error ("this user have a wallet");
    }

    const wallet = req.body ;

    const userWallet = await Wallet.create(wallet);

    if(!userWallet){
        const uniqueCode = await generateCode("c","wallet-charge");
        res.status(404).json({
            result : "c",
            message : "this user does'nt exist",
            uniqueCode
        })
        res.end();
    }
    const newPay = await Payment.create({
        amount : userWallet.amount,
        typePayment : 'charge-wallet',
        status : 1,
        walletId : userWallet.id,
        userId : user._id,
        uniqueKey : uniqueCode,
    })
    res.status(200).json({
        result : "a",
        data : userWallet,
        pay : newPay
    });
});