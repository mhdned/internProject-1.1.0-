/*------<INTIATE AUTH CONTROLLER>------*/
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
const { createToken } = require("../middleware/token/handlerToken");
const { userValidations } = require("../middleware/validation/validateUser");
/*------<MRTHODS AUTH CONTROLLER>------*/
exports.register = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GETTING DATA AND DECLARING VARIABLE>------*/
    const userInfo = req.body;
    /*------<2><VALIDATING DATA>------*/
    const validUserInfo = await userValidations(userInfo, res);
    /*------<3><CREATE DATA>------*/
    const newUser = await User.create(validUserInfo);
    // const user = await User.findById(newUser._id).select("-password").exec();
    /*------<4><CREATE TOKEN & REQUEST CODE>------*/
    const newToken = createToken(newUser._id);
    /*------<5><RESPONSE DATA>------*/
    res.status(201).json({
      result: "created",
      token: newToken,
      user: newUser,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GETTING DATA AND DECLARING VARIABLE>------*/
    const userInfo = req.body;
    /*------<2><VALIDATING DATA>------*/
    if (!userInfo.phoneNumber || !userInfo.password) {
      return res.status(400).send("CLIENT ERROR :: INVALID DATA | 👮‍♂️");
    }
    /*------<3><FIND USER>------*/
    const currentUser = await User.findOne({
      phoneNumber: userInfo.phoneNumber,
    });
    /*------<4><CHECK PASSWORD USER>------*/
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
    /*------<5><CREATE TOKEN & REQUEST CODE>------*/
    const newToken = createToken(currentUser._id);
    /*------<6><RESPONSE DATA>------*/
    res.status(200).json({
      result: "success",
      token: newToken,
      user: currentUser,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
