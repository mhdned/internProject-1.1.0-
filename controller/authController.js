/*------<INTIATE AUTH CONTROLLER>------*/
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
const { createToken } = require("../middleware/token/checkToken");
/*------<MRTHODS AUTH CONTROLLER>------*/
exports.register = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GETTING DATA AND DECLARING VARIABLE>------*/
    const userInfo = req.body;
    /*------<2><CREATE DATA>------*/
    const newUser = await User.create(userInfo);
    // const user = await User.findById(newUser._id).select("-password").exec();
    newUser.password = undefined;
    /*------<3><CREATE TOKEN & REQUEST CODE>------*/
    const newToken = createToken(newUser._id);
    /*------<4><RESPONSE DATA>------*/
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
    res.status(200).json({
      result: "success",
      token: req.userToken,
      user: req.userData,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
