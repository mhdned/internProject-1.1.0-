/*------<INTIATE REQUEST CONTROLLER>------*/
const Request = require("./../model/requestModel");
// const asyncHandler = require("express-async-handler");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.createRequest = async (req,res) => {
  try {
    const request = await Request.create(req.reqData);
    res.status(201).json({
      data : request
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.allRequest = async(req,res)=>{
  try {
    const requests = await Request.find({userId : req.userId});
    res.status(201).json({
      requests
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.singleRequest = async (req,res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(202).json({
      request
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
}

exports.deleteRequest = async (req,res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(202).send("DELETED")
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
}
