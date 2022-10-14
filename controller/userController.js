/*------<INTIATE USER CONTROLLER>------*/
const User = require("./../model/userModel");
const Files = require("./../model/filesModel");
const asyncHandler = require("express-async-handler");
const {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenWithOutRes,
} = require("../middleware/token/handlerToken");
const bcrypt = require("bcrypt");
/*------<INTIATE MULTER>------*/
const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // public/doc/users/{{userID}}/{{counter}} ==> public/doc/users/456484dsa5d15153sd5/59
    cb(null, "public/doc/users");
  },
  filename: async (req, file, cb) => {
    const isUser = await verifyTokenWithOutRes(req.headers.authorization);
    if (!isUser) {
      return "ERROR";
    }
    // userId-year-month-day-{{counter-Random Number}} ==> 456484dsa5d15153sd5-2022-3-20-60
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = `${isUser._id}-${Date.now()}-0.${ext}`;
    cb(null, uniqueSuffix);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      res
        .status(401)
        .send("CLIENT ERROR :: PLEASE UPLOAD FILE WITH CORRECT FORMAT"),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.updatedUserMW = upload.single("userFile");
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
    const userId = req.params.id;
    /*------<2><VALIDATE DATA USER>------*/
    if (!(await User.findById(userId))) {
      res.status(200).send("CLIENT ERROR :: THIS USER IS NOT EXIST");
    }
    /*------<3><CREATE FILE IN DATABASE>------*/
    const file = await Files.create({
      path: fileUpload.path,
      name: fileUpload.filename,
      formatFile: fileUpload.mimetype,
      userId: userId,
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
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
});
