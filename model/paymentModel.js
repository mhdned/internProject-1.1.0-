/*------<INTIATE PAYMENT MODEL>------*/
const mongoose = require("mongoose")
/*------<PAYMENT SCHEMA>------*/
const paymenSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    status:{
        type : Number,
        enum : [0,1,2],
        required : true,
    },
    typePayment : {
        type : String ,
        enum : ['product','charge-wallet'],
        default : 'product',
        required : true,
    },
    walletId:{
        type : mongoose.Types.ObjectId,
        ref : "Wallet"
    },
    productId:{
        type : mongoose.Types.ObjectId,
        ref : "Product"
    },
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
});
/*------<CONST PAYMENT MODEL>------*/
const Payment = new mongoose.model("Payment",walletSchema);
/*------<EXPORT PAYMENT MODEL>------*/
module.exports = Payment;