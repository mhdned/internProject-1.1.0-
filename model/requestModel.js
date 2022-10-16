/*------<INTIATE REQUEST MODEL>------*/
const mongoose = require("mongoose");
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
