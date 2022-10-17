/*------<INTIATE OPTION CONTROLLER>------*/
const Option = require("../model/optionModel");
const moment = require('jalali-moment-timezone');
const asyncHandler = require("express-async-handler");
/*------<MRTHODS OPTION CONTROLLER>------*/
exports.generateCode = asyncHandler(async (req,res, next) => {
  let uniqueCode = await Option.findOne({ key: req.body.key });
  if (!uniqueCode) {
    uniqueCode = await Option.create({ key : req.body.key, value: "0" });
    finalCode = uniqueCode.value;
  } else {
    uniqueCode = await Option.findOneAndUpdate(
      { key : req.body.key },
      { value: uniqueCode.value + 1 },
      { new: true }
    );
    finalCode = uniqueCode.value;
  }
  let today = moment().format('jYYYY-jMM-jDD');
  let uniqueKey;
  uniqueKey = `${today}`;
  uniqueKey +=`-${req.body.key}`;
  uniqueKey += `-${finalCode}`;
  req.uniqueKey = uniqueKey;
  req.reqData = req.body;
  req.reqData.uniqueKey = req.uniqueKey;
  req.reqData.userId = req.userId;
  next()
});
