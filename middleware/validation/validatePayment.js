const asyncHandler = require("express-async-handler");
/*------<VALIDATION MIDDLEWARE>------*/
exports.validatePayment = asyncHandler(async (req,res,next)=>{
    try {
        if(!req.body.type){
            return res.status(400).send("CLIENT ERROR :: INVALID DATA 1 | 👮‍♂️");
        }
        if(req.body.type != 'wallet'){
            if(req.body.type == 'purchase'){
                req.payType = req.body.type;
                return next();
            }
            return res.status(400).send("CLIENT ERROR :: INVALID DATA 2 | 👮‍♂️");
        }
        req.payType = req.body.type;
        next();
    } catch (error) {
        /*------<X><SERVER ERROR>------*/
        console.log(error);
        return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
    }
})