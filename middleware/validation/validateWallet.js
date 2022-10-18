const asyncHandler = require("express-async-handler");
const Wallet = require("../../model/walletModel");

exports.validateDataWallet = asyncHandler(async (req, res, next) => {
    try {
        /*------<1><GET WALLET AMOUNT>------*/
        let wallet = req.body.amount;
        /*------<2><VALIDATE WALLET AMOUNT>------*/
        if (wallet && wallet > 0.0 && typeof wallet === "number") {
            req.walletAmount = wallet;
            return next()
        }
        return res.status(401).send("PLEASE PROVIDE A VALUE FOR AMOUNT");
    } catch (error) {
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
});

exports.checkWalletExist = asyncHandler(async (req, res, next) => {
    try {
        /*------<1><CHECK WALLET EXIST>------*/
        const walletExist = await Wallet.findOne({userId : req.userId});
        if (walletExist) {
            req.wallet = walletExist;
            req.walletId = walletExist._id;
            return next();
        }
        /*------<1><CREATE WALLET IF NOT EXIST>------*/
        const wallet = await Wallet.create({
            amount : req.body.amount,
            userId : req.userId
        });
        /*------<1><CHECK WALLET CREATED>------*/
        if(wallet){
            req.wallet = wallet;
            next();
        }
        return res.status(409).send("WALLET NOT CREATED")

    } catch (error) {
        console.log(error);
        return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
    }
});