/*------<INTIATE OPTION MODEL>------*/
const mongoose = require("mongoose");
/*------<OPTION SCHEMA>------*/
const optionSchema = new mongoose.Schema({
    key : {
        type: String,
    },    
    value : {
        type: Number,
    }
});
/*------<CONST OPTION MODEL>------*/
const Option = mongoose.model("Option",optionSchema);
/*------<EXPORT OPTION MODEL>------*/
module.exports = Option;
