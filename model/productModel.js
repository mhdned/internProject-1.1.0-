/*------<INTIATE PRODUCT MODEL>------*/
const mongoose = require("mongoose")
/*------<PRODUCT SCHEMA>------*/
const productSchema = new mongoose.Schema({
    title : {
        type : String,
        unique : true,
        required : true,
        maxLength : 80
    },
    price:{
        type : Number,
        required : true,
    },
    entities:{
        type : Number,
        required : true
    },
},{
    timestamps : true
});
/*------<CONST PRODUCT MODEL>------*/
productSchema.pre('save',async function(){
    this.updatedAt = undefined;
})
const Product = new mongoose.model("Product",productSchema);
/*------<EXPORT PRODUCT MODEL>------*/
module.exports = Product;