const validator = require("validator");
const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const IRCheck = require("ircheck");
const bcrypt = require("bcrypt");
const {logRes} = require("./../../utils/errorHandlet")
const {dateToString} = require("./../../utils/dateHandler");
const moment = require('moment-timezone');
/*------<VALIDATION MIDDLEWARE>------*/
exports.userValidationRegister = asyncHandler(async (req, res, next) => {
  try {
    /*------<CHECK NEW USER INFO>------*/
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
    if (!IRCheck.National.isNationalCodeValid(userInfo.nationalNumber)) {
      return res
        .status(400)
        .send("CLIENT ERROR :: INVALID NATIONAL NUMBER | 👮‍♂️");
    }
    if(userInfo.birth){
      if(typeof userInfo.birth !== "string"){
        return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
    }
    // let ubd = userInfo.birth.split("/");
    ubd = moment(new Date(userInfo.birth)).tz('Asia/Tehran').format("x");
    req.body.birth =  ubd;
    // return logRes(res,req.body.birth);
      return next();
    }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});

exports.userValidationLogin = asyncHandler(async (req, res, next) => {
  try {
    /*------<CHECK USER DATA (LOGIN)>------*/
    const userInfo = req.body;
    if (!userInfo.password || !userInfo.phoneNumber) {
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
      typeof (userInfo.phoneNumber * 1) !== "number" ||
      !IRCheck.Phone.isMobile(userInfo.phoneNumber)
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
    }

    const currentUser = await User.findOne({
      phoneNumber: userInfo.phoneNumber,
    });
    if (
      !currentUser ||
      !(await currentUser.comparePassword(
        userInfo.password,
        currentUser.password
      ))
    ) {
      return res
        .status(400)
        .send("CLIENT ERROR :: USER NOT EXIST OR PASSWORD IS WRONG | 👮‍♂️");
    }
    currentUser.password = undefined;
    console.log(dateToString(currentUser.birth));
    currentUser.birth = dateToString(currentUser.birth);
    req.userData = currentUser;
    req.userId = currentUser._id;
    return next();
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
});

exports.validationUpdate = asyncHandler(async (req,res,next)=>{
  try {
        /*------<1><GET USER AND INFO>------*/
        req.updateInfo = req.body;
        /*------<3><VALIDATE USER NEW INFO>------*/
        if (req.updateInfo.password) {
          if (req.updateInfo.password === req.updateInfo.passwordConfirm) {
            req.updateInfo.password = await bcrypt.hash(req.updateInfo.password, 12);
            req.updateInfo.passwordConfirm = undefined;
          }else {
            return res.status(500).send("ERROR PASSWORD :: SOMETHING WRONG | 🔑");
          }
          if (IRCheck.National.isNationalCodeValid(req.updateInfo.nationalNumber)) {
            req.updateInfo.nationalNumber = await bcrypt.hash(req.updateInfo.nationalNumber, 12);
          }else{
            return res.status(500).send("ERROR PASS :: SOMETHING WRONG 2 | 🔑");
          }
          if(req.updateInfo.phoneNumber){
            if (!req.updateInfo.phoneNumber.startsWith("0") ||
            typeof (req.updateInfo.phoneNumber * 1) !== "number") {
              return res.status(500).send("ERROR PASS :: SOMETHING WRONG 3 | 🔑");
            }
          }
          if(req.updateInfo.birth){
            if(typeof req.updateInfo.birth !== "string"){
              return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
          }
          ubd = moment(new Date(req.updateInfo.birth)).tz('Asia/Tehran').format("x");
          req.updateInfo.birth =  ubd;
          }
          // return logRes(res,req.updateInfo.birth);
          next()
        }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
})