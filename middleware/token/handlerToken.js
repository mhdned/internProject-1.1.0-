/*------<INTIATE TOKEN>------*/
const User = require("./../../model/userModel")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
/*------<METHOD TOKEN>------*/
exports.createToken = ((id) => {
   let token = jwt.sign({ id }, process.env.JWT_SECURE_PK, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return token
});
exports.verifyToken = asyncHandler(async(token) => {
  if(
    token &&
    token.startsWith('Bearer')
  ){
      token = token.split(' ')[1];
  }
  if (!token) {
      throw new Error("Token is wrong");
  }
  const decoded = await jwt.verify(token,process.env.JWT_SECURE_PK);
  if(!decoded){
    return false;
  }else{
    return decoded;
  }
})
exports.verifyTokenAdmin = asyncHandler(async(token) => {
  if(
    token &&
    token.startsWith('Bearer')
  ){
      token = token.split(' ')[1];
  }
  if (!token) {
      throw new Error("Token is wrong");
  }
  const decoded = await jwt.verify(token,process.env.JWT_SECURE_PK);
  const admin = User.findById(decoded.id);
  if(!admin || admin.role !== "admin"){
    res.status(403).json({
      status : "c",
      message : "need permission"
    });
    decoded = false;
  }
  if(!decoded){
    return false;
  }else{
    return decoded;
  }
})