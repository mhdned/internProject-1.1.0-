const asyncHandler = require("express-async-handler");
const Wallet = require("../../model/walletModel");

exports.validateDataWallet = asyncHandler(async (req, res, next) => {
    try {
        let wallet = req.body.amount;
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
        const walletExist = await Wallet.findOne({userId : req.userId});
        if (walletExist) {
            req.wallet = walletExist;
            req.walletId = walletExist._id;
            return next();
        }
        const wallet = await Wallet.create(walletInfo);
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