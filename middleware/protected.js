/*------<INTIATE PROTECTED ROUTES>------*/
const asyncHandler = require("express-async-handler");
const {verifyToken} = require("./../middleware/token/handlerToken");
const User = require("./../model/userModel")
/*------<METHODS PROTECTED ROUTES>------*/
exports.protected = asyncHandler(async(req,res,next)=>{
    tokenDecode = await verifyToken(req.headers.authorization);
    let user = User.findById(tokenDecode.id);
    if (!user) {
      res.status(404).json({
        status : "c",
        message : "user not found"
      })
      throw new Error("user not found");
    }
    next();
});