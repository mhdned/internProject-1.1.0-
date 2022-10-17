/*------<INTIATE REQUEST MODEL>------*/
const mongoose = require("mongoose");
const moment = require('jalali-moment-timezone');
/*------<REQUEST SCHEMA>------*/
const requestSchema = new mongoose.Schema(
  {
    title : {
      type : String,
      required : true
    },
    description : {
      type : String,
      required : true
    },
    dateReq : {
      type : String,
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String,
        enum : ['draft','accepted','rejected'],
        default : 'draft'
    },
    uniqueKey : {
      type : String,
    },
    date : {
        type : Number,
        default : moment(Date.now())
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
