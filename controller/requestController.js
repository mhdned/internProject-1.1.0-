/*------<INTIATE REQUEST CONTROLLER>------*/
const Request = require("./../model/requestModel");
const moment = require('jalali-moment-timezone');
// const asyncHandler = require("express-async-handler");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.createRequest = async (req,res) => {
  try {
    req.reqData.date = moment(Date.now());
    const request = await Request.create(req.reqData);
    res.status(201).json(request)
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.allRequest = async(req,res)=>{
  try {
    const requests = await Request.find({userId : req.userId});
    res.status(201).json(requests)
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.singleRequest = async (req,res) => {
  try {
    let request = await Request.findById(req.params.id);
    request.dateReq = moment(new Date(request.date)).format('jYYYY/jMM/jDD|hh:mm:ss');
    res.status(200).json({
      date : request.dateReq,
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
