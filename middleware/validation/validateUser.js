const validator = require("validator");
const asyncHandler = require("express-async-handler");
/*------<VALIDATION MIDDLEWARE>------*/
exports.userValidationRegister = asyncHandler(async(req,res,next)=>{
  try {
    const userInfo = req.body;
    if (
      !userInfo.userName ||
      !userInfo.password ||
      !userInfo.passwordConfirm ||
      !userInfo.email ||
      !userInfo.phoneNumber ||
      !userInfo.nationalNumber
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID DATA | 👮‍♂️");
    }
    if (
      typeof userInfo.userName !== "string" ||
      userInfo.userName.search(/(\s)/g) !== -1
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID USERNAME | 👮‍♂️");
    }
    if (
      typeof userInfo.password !== "string" ||
      userInfo.password.search(/(\s)/g) !== -1
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PASSWORD | 👮‍♂️");
    }
    if (userInfo.password !== userInfo.passwordConfirm) {
      return res
        .status(400)
        .send("CLIENT ERROR :: COMPARE PASSWORD IS WRONG | 👮‍♂️");
    }
    if (userInfo.password !== userInfo.passwordConfirm) {
      return res
        .status(400)
        .send("CLIENT ERROR :: COMPARE PASSWORD IS WRONG | 👮‍♂️");
    }
    if (!validator.isEmail(userInfo.email)) {
      return res.status(400).send("CLIENT ERROR :: INVALID EMAIL | 👮‍♂️");
    }
    if (
      !userInfo.phoneNumber.startsWith("0") ||
      typeof (userInfo.phoneNumber * 1) !== "number"
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
    }
    return next();
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});
 
exports.userValidationLogin = asyncHandler(async(req,res,next)=>{
  try {
    const userInfo = req.body;
    if (
      !userInfo.password ||
      !userInfo.phoneNumber
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID DATA | 👮‍♂️");
    }
    if (
      typeof userInfo.password !== "string" ||
      userInfo.password.search(/(\s)/g) !== -1
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PASSWORD | 👮‍♂️");
    }
    if (
      !userInfo.phoneNumber.startsWith("0") ||
      typeof (userInfo.phoneNumber * 1) !== "number"
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
    }
    return next();
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
})