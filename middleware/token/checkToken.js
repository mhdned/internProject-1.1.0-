const asyncHandler = require("express-async-handler");
const User = require("./../../model/userModel");
const jwt = require("jsonwebtoken");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  token = req.headers.authorization;
  console.log(req.headers.authorization);
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (!token) {
    res.status(404).send("TOKEN ERROR :: TOKEN IS INVALID");
  }
  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECURE_PK);
    /*------<TOKEN USER>------*/
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
