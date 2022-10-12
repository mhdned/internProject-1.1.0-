/*------<INTIATE AUTH CONTROLLER>------*/
const User = require("./../model/userModel");
const GeneralValidate = require("./../middleware/validation/validateGeneral");
const asyncHandler = require("express-async-handler");
const { createToken } = require("../middleware/token/handlerToken");
/*------<MRTHODS AUTH CONTROLLER>------*/
exports.register = asyncHandler(async (req, res, next) => {
  /*------<1><VALIDATE DATA>------*/
  const userInfo = req.body;
  const generalValidate = await new GeneralValidate(userInfo)
    .isExist([
      "userName",
      "fullName",
      "email",
      "password",
      "passwordConfirm",
      "phoneNumber",
      "nationalNumber",
    ])
    .isString([
      "userName",
      "fullName",
      "email",
      "password",
      "passwordConfirm",
      "phoneNumber",
      "nationalNumber",
    ])
    .get();
  if (!generalValidate) {
    res.status(401).json({
      status: "c",
      messages: "Invalid Data",
      data: generalValidate,
    });
    throw new Error("Invalid Data");
    // return res.status(412).send('Invalid Data')
  }
  /*------<2><CREATE DATA>------*/
  const user = await User.create(generalValidate);
  const token = createToken(user._id);
  /*------<3><RESPONSE DATA>------*/
  res.status(201).json({
    status: "a",
    token,
    data: user,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><VALIDATE DATA>------*/
  const userInfo = req.body;
  const generalValidate = await new GeneralValidate(userInfo)
  .isExist(['phoneNumber','password'])
  .get();
  if (!generalValidate) {
    res.status(401).json({
      status: "c",
      messages: "Invalid Data",
      data: generalValidate,
    });
    throw new Error("Invalid Data");
  }
  /*------<2><CREATE DATA>------*/
  const user = await User.findOne({phoneNumber : generalValidate.phoneNumber});
  const token = await createToken(user._id);
  /*------<3><RESPONSE DATA>------*/
  res.status(200).json({
    status: "a",
    token,
    data: user,
  });
  } catch (error) {
    console.log(error)
    return res.status(500).send('مشکلی پیش آمده است')
  }
  
});