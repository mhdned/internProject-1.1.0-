/*------<INTIATE USER CONTROLLER>------*/
const User = require("./../model/userModel");
const Files = require("./../model/filesModel");
const fs = require("node:fs");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
/*------<MRTHODS USER CONTROLLER>------*/
exports.allUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><CHECK USER TOKEN>------*/
    if (req.userData.role !== "admin") {
      return res
        .status(403)
        .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
    }
    /*------<2><FIND ALL USER>------*/
    const users = await User.find();
    /*------<2><RESPONSE USERS>------*/
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER>------*/
    /*------<2><CHECK USER TOKEN>------*/
    if (req.userData.role !== "admin") {
      return res
        .status(403)
        .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
    }
    /*------<3><FIND USER>------*/
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("CLIENT ERROR :: USER NOT FOUND | 👮‍♂️");
    }

    const userFiles = await Files.find({ userId: user._id }).select("path");

    if (!userFiles) {
      user.files = "none";
    }
    user.files = userFiles;
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
    /*------<2><CHECK USER TOKEN>------*/
    if (req.userData.role !== "admin") {
      return res
        .status(403)
        .send("CLIENT ERROR :: YOU DONT HAVE PERMISSION TO THIS ROUTE | 👮‍♂️");
    }
    /*------<3><DELETE USER>------*/
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send("SUCCESS :: USER DELETED | 🧯");
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER>------*/
    const userInfo = req.body;
    /*------<2><VALIDATE DATA USER>------*/
    if (!userInfo.email || !userInfo.password) {
      return res
        .status(403)
        .send("CLIENT ERROR :: PLEASE SEND ALL REQUIRE FIELD | 👮‍♂️");
    }
    if (!userInfo.status || userInfo.status !== true) {
      return res
        .status(403)
        .send(
          "CLIENT ERROR :: YOU DONT HAVE PERMISSION TO CHANGE PASSWORD | 👮‍♂️"
        );
    }
    /*------<3><CHECK USER>------*/
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return res
        .status(403)
        .send("CLIENT ERROR :: THIS USER WAS NOT FOUND | 😥");
    }
    /*------<4><UPDATE PASSWORD USER>------*/
    userInfo.password = await bcrypt.hash(userInfo.password, 12);
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: userInfo.password,
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(401).send("SERVER ERROR :: SOMTHING WRONG | 😥");
    }
    /*------<5><RESPONSE USER>------*/
    res.status(200).json({
      status: "updated",
      updateUser,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});

exports.uploadFiles = asyncHandler(async (req, res, next) => {
  try {
    /*------<1><GET USER & FILE UPLOAD>------*/
    const fileUpload = req.file;
    /*------<3><CREATE FILE IN DATABASE>------*/
    const file = await Files.create({
      path: fileUpload.path,
      name: fileUpload.filename,
      formatFile: fileUpload.mimetype,
      userId: req.userData._id,
      size: fileUpload.size,
    });
    /*------<4><CHECK FILE>------*/
    if (!file) {
      console.log(file);
      return res.status(401).send("SERVER ERROR :: SOMTHING WRONG | 😥");
    }
    /*------<5><RESPONSE USER>------*/
    res.status(201).json({
      status: "created",
      file,
    });
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    fileProblem(req.file.path);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
fileProblem = (filePath) => {
  let fileDelete = fs.realpathSync(`${__dirname}\\..\\${filePath}`);
  fs.unlinkSync(fileDelete);
};
