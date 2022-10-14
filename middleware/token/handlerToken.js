/*------<INTIATE TOKEN>------*/
const User = require("./../../model/userModel");
const jwt = require("jsonwebtoken");
/*------<METHOD TOKEN>------*/
exports.createToken = (id) => {
  /*------<CREATE TOKEN>------*/
  let token = jwt.sign({ id }, process.env.JWT_SECURE_PK, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
exports.verifyTokenWithOutRes = async (token) => {
  /*------<CHECK PREFIX TOKEN>------*/
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
      return "TOKEN ERROR :: NOT FOUND USER";
    } else {
      return user;
    }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return "SERVER ERROR :: THERE IS A PROBLEM | 🧯";
  }
};
exports.verifyToken = async (token, res) => {
  /*------<CHECK PREFIX TOKEN>------*/
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
      return user;
    }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};
exports.verifyTokenAdmin = async (token, res) => {
  /*------<CHECK PREFIX TOKEN>------*/
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  /*------<CHECK TOKEN EXIST>------*/
  if (!token) {
    res.status(404).send("TOKEN ERROR :: TOKEN IS INVALID");
  }
  /*------<CHECK TOKEN>------*/
  try {
    /*------<CHECK TOKEN>------*/
    const decoded = jwt.verify(token, process.env.JWT_SECURE_PK);
    /*------<TOKEN ADMIN>------*/
    const admin = await User.findOne({ _id: decoded.id });
    /*------<CHECK TOKEN ADMIN>------*/
    if (!admin) {
      return res.status(404).send("TOKEN ERROR :: NOT FOUND USER");
    }
    if (admin.role !== "admin") {
      return res
        .status(403)
        .send("TOKEN ERROR :: YOU DONT HAVE ACCESS TO THIS ROUTE");
    } else {
      return admin;
    }
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};
