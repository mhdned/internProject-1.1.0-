/*------<INTIATE WALLET CONTROLLER>------*/
const Wallet = require("./../model/walletModel");
const {verifyToken} = require("./../middleware/token/handlerToken")
const { generateCode } = require("./optionController");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS WALLET CONTROLLER>------*/
exports.createWallet = asyncHandler(async (req, res, next) => {
  try {
    const walletInfo = {
      amount : req.wallet.amount + req.walletAmount,
    }
    const wallet = await Wallet.findByIdAndUpdate(req.walletId,walletInfo,{new : true});

    if(!wallet){
      return res.status(403).send("CLIENT ERROR :: WALLET ERROR | 👮‍♂️");
    }
    res.status(201).json({
      wallet
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    generateCode('failed','wallet');
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
