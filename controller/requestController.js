/*------<INTIATE REQUEST CONTROLLER>------*/
const Request = require("./../model/requestModel");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.createRequest = async(reqInfo)=>{
    try {
        return await Request.create(reqInfo);
    } catch (error) {
        return false
    }
}
/*
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    paymentId : {
        type : mongoose.Types.ObjectId,
        ref : "Payment"
    },
    wallet : {
        type : Boolean,
    },
    productId : {
        type : mongoose.Types.ObjectId,
        ref : "Product"
    },
    status : {
        type : String,
        enum : ['draft','accepted','rejected'],
        default : 'draft'
    }
*/