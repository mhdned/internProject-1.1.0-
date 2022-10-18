/*------<INTIATE REQUEST CONTROLLER>------*/
const Request = require("./../model/requestModel");
const { dateToString,dateToNumber } = require("./../utils/dateHandler");
const {logRes} = require("./../utils/errorHandlet")
const moment = require("moment-jalaali");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.createRequest = async (req,res) => {
  try {
    /*------<CREATE REQUEST>------*/
    let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    console.log(today);
    req.reqData.date = moment(today).tz('Asia/Tehran').format('x');
    const request = await Request.create(req.reqData);
    res.status(201).json(request)
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.allRequest = async(req,res)=>{
  try {
    /*------<FIND ALL REQUEST USER>------*/
    const requests = await Request.find({userId : req.userId});
    res.status(201).json(requests)
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
};

exports.singleRequest = async (req,res) => {
  try {
    /*------<FIND SINGLE REQUEST USER>------*/
    let request = await Request.findById(req.params.id);
    // dateToNumber(request.date);
    /*------<USER HELPER DATE TO STRING>------*/
    // return logRes(res,dateToString(request.date));
    request.date = dateToString(request.date);
    res.status(200).json(request)
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
}

exports.deleteRequest = async (req,res) => {
  try {
    /*------<USER DELETE SINGLE REQUEST>------*/
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).send("DELETED")
  } catch (error) {
    console.log(error);
    return res.status(500).send("SERVER ERROR :: THERE IS A PROBLEM | 🧯");
  }
}
