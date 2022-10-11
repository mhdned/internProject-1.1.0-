/*------<INTIATE WALLET CONTROLLER>------*/
const User = require("./../model/userModel");``
const Wallet = require("./../model/walletModel");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS WALLET CONTROLLER>------*/
exports.chargeWallet = asyncHandler(async(req,res,next)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json({
            result : "c",
            data : "user not found"
        })
        res.end();
    }
    req.body.userId = userId;
    const wallet = req.body ;

    const userWallet = await Wallet.create(wallet);
    res.status(200).json({
        result : "a",
        data : userWallet
    });
});