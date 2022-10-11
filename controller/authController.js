/*------<INTIATE AUTH CONTROLLER>------*/
const User = require("./../model/userModel");
const UserValidate = require("./../middleware/validation/validateUser");
const asyncHandler = require("express-async-handler");
const { createToken } = require("../middleware/token/handlerToken");
/*------<MRTHODS AUTH CONTROLLER>------*/
exports.register = asyncHandler(async (req, res, next) => {
  /*------<1><VALIDATE DATA>------*/
  const userInfo = req.body;
  const userValidate = await new UserValidate(userInfo)
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
  if (!userValidate) {
    res.status(401).json({
      status: "c",
      messages: "Invalid Data",
      data: userValidate,
    });
    throw new Error("Invalid Data");
  }
  /*------<2><CREATE DATA>------*/
  const user = await User.create(userValidate);
  const token = createToken(user._id);
  /*------<3><RESPONSE DATA>------*/
  res.status(201).json({
    status: "a",
    token,
    data: user,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  /*------<1><VALIDATE DATA>------*/
  const userInfo = req.body;
  const userValidate = await new UserValidate(userInfo)
  .isExist(['phoneNumber','password'])
  .get();
  if (!userValidate) {
    res.status(401).json({
      status: "c",
      messages: "Invalid Data",
      data: userValidate,
    });
    throw new Error("Invalid Data");
  }
  /*------<2><CREATE DATA>------*/
  const user = await User.findOne({phoneNumber : userValidate.phoneNumber});
  const token = createToken(user._id);
  /*------<3><RESPONSE DATA>------*/
  res.status(201).json({
    status: "a",
    token,
    data: user,
  });
});