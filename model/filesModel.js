/*------<INTIATE FILES MODEL>------*/
const mongoose = require("mongoose")
/*------<FILES SCHEMA>------*/
const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : true
    },
    formatFile : {
        type : String,
        enum: ["jpg", "png", "jpeg"]
    },
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
},
{
    timestamps : true
}
);
/*------<CONST FILES MODEL>------*/
const Files = new mongoose.model("Files",walletSchema);
/*------<EXPORT FILES MODEL>------*/
module.exports = Files;