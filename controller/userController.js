/*------<INTIATE USER CONTROLLER>------*/
const User = require("./../model/userModel");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS USER CONTROLLER>------*/
exports.allUser = asyncHandler(async(req,res,next)=>{
  /*------<1><RES ALL USERS>------*/
  const user = await User.find();
  res.status(200).json({
    status : "OK",
    data : user
  })
});
exports.getUser = asyncHandler(async (req,res,next)=>{
  const userId = req.params.id;
  if (!userId) {
    res.status(404).json({
      status : "c",
      message : "id parameter is required"
    })
  }
  const user = await User.findById(userId);
  res.status(200).json({
    status : "a",
    data : user
  })
});
exports.updateUser = asyncHandler(async (req,res,next)=>{
  const userId = req.params.id;
  const newInfo = req.body;
  if (!userId) {
    res.status(404).json({
      status : "c",
      message : "id parameter is required"
    })
  }
  const user = await User.findByIdAndUpdate(userId,newInfo,{new: true});
  res.status(200).json({
    status : "a",
    data : user
  })
});

exports.deleteUser = asyncHandler(async(req,res,next)=>{
  const userId = req.params.id;
  if (!userId) {
    res.status(404).json({
      status : "c",
      message : "id parameter is required"
    })
  }
  const user = await User.findByIdAndDelete(userId);
  res.status(204)
});