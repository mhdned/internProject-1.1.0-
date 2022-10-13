/*------<INTIATE USER CONTROLLER>------*/
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
const {
  verifyToken,
  verifyTokenAdmin,
} = require("../middleware/token/handlerToken");
const bcrypt = require("bcrypt");
/*------<MRTHODS USER CONTROLLER>------*/
exports.allUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><CHECK USER TOKEN>------*/
    const isUser = await verifyTokenAdmin(req.headers.authorization, res);
    if (!isUser) {
      return res
        .status(403)
        .send("CLIENT ERROR :: PLEASE LOGIN BEFORE REQUEST | 👮‍♂️");
    }
    /*------<2><FIND ALL USER>------*/
    const users = await User.find();
    /*------<2><RESPONSE USERS>------*/
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER>------*/
    const userId = req.params.id;
    /*------<2><CHECK USER TOKEN>------*/
    const isUser = await verifyTokenAdmin(req.headers.authorization, res);
    if (!isUser) {
      return res
        .status(403)
        .send("CLIENT ERROR :: PLEASE LOGIN BEFORE REQUEST | 👮‍♂️");
    }
    /*------<3><FIND USER>------*/
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("CLIENT ERROR :: USER NOT FOUND | 👮‍♂️");
    }
    /*------<4><RESPONSE USER>------*/
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER AND INFO>------*/
    const userId = req.params.id;
    const newInfo = req.body;
    /*------<2><CHECK USER TOKEN>------*/
    const isUser = await verifyToken(req.headers.authorization, res);
    if (!isUser) {
      return res
        .status(403)
        .send("CLIENT ERROR :: PLEASE LOGIN BEFORE REQUEST | 👮‍♂️");
    }
    if (isUser.role == "user" && isUser._id != userId) {
      return res
        .status(403)
        .send("TOKEN ERROR :: YOU DONT HAVE ACCESS TO THIS USER | 👮‍♀️");
    }
    /*------<3><VALIDATE INFO>------*/
    if (newInfo.password) {
      try {
        if (newInfo.password === newInfo.passwordConfirm) {
          newInfo.password = await bcrypt.hash(newInfo.password, 12);
          newInfo.passwordConfirm = undefined;
        }
        if (!newInfo.nationalNumber) {
          newInfo.nationalNumber = await bcrypt.hash(this.nationalNumber, 12);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send("ERROR PASS :: SOMETHING WRONG | 🔑");
      }
    }
    /*------<4><FIND USER>------*/
    const user = await User.findByIdAndUpdate(userId, newInfo, { new: true });
    if (!user) {
      return res.status(404).send("CLIENT ERROR :: USER NOT FOUND | 👮‍♂️");
    }
    /*------<5><RESPONSE USER>------*/
    res.status(200).json({
      status: "updated",
      user,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER>------*/
    const userId = req.params.id;
    if (!userId) {
      return res.status(403).send("CLIENT ERROR :: PLEASE SEND USER ID | 👮‍♂️");
    }
    /*------<2><CHECK USER TOKEN>------*/
    const isUser = await verifyTokenAdmin(req.headers.authorization, res);
    if (!isUser) {
      return res
        .status(403)
        .send("CLIENT ERROR :: PLEASE LOGIN BEFORE REQUEST | 👮‍♂️");
    }
    /*------<3><DELETE USER>------*/
    await User.findByIdAndDelete(userId);
    res.status(204).send("SUCCESS :: USER DELETED | 🧯");
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
