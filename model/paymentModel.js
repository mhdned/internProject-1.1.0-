/*------<INTIATE PAYMENT MODEL>------*/
const mongoose = require("mongoose")
const Wallet = require("./walletModel")
/*------<PAYMENT SCHEMA>------*/
const paymenSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    walletId:{
        type : mongoose.Types.ObjectId,
        ref : "Wallet"
    },
    type : {
        type : String,
        enum : ['wallet',"purchase"]
    },
    productPrice:{
        type : Number,
    },
    productId:{
        type : mongoose.Types.ObjectId,
        ref : "Product"
    },
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    uniqueKey : {
        type : String,
    },
    date : {
        type : Number
    }
},{
    timestamps : true
});
/*------<CONST PAYMENT MODEL>------*/
const Payment = mongoose.model("Payment",paymenSchema);
/*------<EXPORT PAYMENT MODEL>------*/
module.exports = Payment;