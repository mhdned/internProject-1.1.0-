/*------<INTIATE REQUEST MODEL>------*/
const mongoose = require("mongoose");
/*------<REQUEST SCHEMA>------*/
const requestSchema = new mongoose.Schema(
  {
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
        default : false
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
  },
  {
    timestamps: true,
  }
);
/*------<CONST REQUEST MODEL>------*/
const Request = mongoose.model("Request", requestSchema);
/*------<EXPORT REQUEST MODEL>------*/
module.exports = Request;
