const asyncHandler = require("express-async-handler");
/*------<VALIDATION MIDDLEWARE>------*/
exports.validatePayment = asyncHandler(async (req,res,next)=>{
    try {
        /*------<CHECK PAYMENT TYPE>------*/
        if(!req.body.type){
            return res.status(400).send("CLIENT ERROR :: PAYMENT TYPE DOES NOT EXIST | 👮‍♂️");
        }
        /*------<CHECK TYPE OF PAYMENT>------*/
        if(req.body.type != 'wallet'){
            if(req.body.type == 'purchase'){
                req.payType = req.body.type;
                return next();
            }
            return res.status(400).send("CLIENT ERROR :: INVALID PAYMENT TYPE  | 👮‍♂️");
        }
        /*------<TYPE OF PAYMENT = WALLET>------*/
        req.payType = req.body.type;
        next();
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
    }
})