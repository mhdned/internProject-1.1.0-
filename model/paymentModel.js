/*------<INTIATE PAYMENT MODEL>------*/
const mongoose = require("mongoose")
const Wallet = require("./walletModel")
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
    walletAmount :{
        type : Number
    },
    uniqueKey : {
        type : String,
        require : true
    }
},{
    timestamps : true
});
/*------<CONST PAYMENT MODEL>------*/
paymenSchema.pre("save",async function(next) {
    if (this.walletId) {
        if(this.productPrice < this.walletAmount){
            await Wallet.findByIdAndUpdate(this.walletId , {amount : this.walletAmount-this.amount},{new: true});
        }
    }
});
paymenSchema.pre("save",async function(next) {
    this.productPrice = undefined;
    this.walletAmount = undefined;
})
const Payment = mongoose.model("Payment",paymenSchema);
/*------<EXPORT PAYMENT MODEL>------*/
module.exports = Payment;