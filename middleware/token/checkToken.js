const asyncHandler = require("express-async-handler");
const User = require("./../../model/userModel");
const jwt = require("jsonwebtoken");

const {logRes} = require("./../../utils/errorHandlet");
// return logRes(res,{value});

exports.verifyToken = asyncHandler(async (req, res, next) => {
  /*------<1><GET TOKEN>------*/
  token = req.headers.authorization;
  /*------<2><VALIDATE TOKEN>------*/
  if (!token) {
    res.status(404).send("TOKEN ERROR :: TOKEN IS INVALID");
  }
  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  try {
    /*------<3><VERIFY TOKEN>------*/
    const decoded = jwt.verify(token, process.env.JWT_SECURE_PK);
    /*------<FIND USER FROM TOKEN>------*/
    const user = await User.findById(decoded.userId);
    /*------<CHECK TOKEN USER>------*/
    if (!user) {
      return res.status(404).send("TOKEN ERROR :: NOT FOUND USER");
    } else {
      req.userId = user._id;
      req.userData = user;
      return next();
    }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});

exports.createToken = asyncHandler(async (req, res, next) => {
  try {
    /*------<CREATE TOKEN>------*/
    const userId = req.userId;
    let token = jwt.sign({ userId }, process.env.JWT_SECURE_PK, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    req.userToken = token;
    return next();
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
