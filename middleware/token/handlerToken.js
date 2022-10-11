/*------<INTIATE TOKEN>------*/
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
/*------<METHOD TOKEN>------*/
exports.createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECURE_PK, {
        expiresIn: process.env.JWT_EXPIRE,
      });
};
exports.verifyToken = async(token) => {
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
}