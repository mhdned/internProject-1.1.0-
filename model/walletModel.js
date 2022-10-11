/*------<INTIATE WALLET MODEL>------*/
const mongoose = require("mongoose")
/*------<WALLET SCHEMA>------*/
const walletSchema = new mongoose.Schema({
    amount : {
        type : Number,
        default : 0.0,
    },
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
},{
    timestamps : true
});
/*------<CONST WALLET MODEL>------*/
const Wallet = mongoose.model("Wallet",walletSchema);
/*------<EXPORT WALLET MODEL>------*/
module.exports = Wallet;