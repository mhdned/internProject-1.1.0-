/*------<INTIATE OPTION MODEL>------*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/*------<OPTION SCHEMA>------*/
const optionSchema = new mongoose.Schema({
    key : {
        type: String,
        required : true,
    },    
    value : {
        type: String,
        required : true,
    }
});
/*------<CONST OPTION MODEL>------*/
const Option = new mongoose.model("Option",optionSchema);
/*------<EXPORT OPTION MODEL>------*/
module.exports = Option;
