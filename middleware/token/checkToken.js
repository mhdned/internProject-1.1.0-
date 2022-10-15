const asyncHandler = require("express-async-handler");
const User = require("./../../model/userModel");
const jwt = require("jsonwebtoken");

exports.verifyToken = asyncHandler(async (req,res,next) => {
    token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
      }
      /*------<CHECK TOKEN EXIST>------*/
      if (!token) {
        res.status(404).send("TOKEN ERROR :: TOKEN IS INVALID");
      }
      try {
        /*------<CHECK TOKEN>------*/
        const decoded = jwt.verify(token, process.env.JWT_SECURE_PK);
        /*------<TOKEN USER>------*/
        const user = await User.findById(decoded.id);
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
})