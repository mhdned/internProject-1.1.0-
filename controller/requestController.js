/*------<INTIATE REQUEST CONTROLLER>------*/
const Request = require("./../model/requestModel");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS REQUEST CONTROLLER>------*/
exports.createRequest = async (reqInfo) => {
  try {
    return await Request.create(reqInfo);
  } catch (error) {
    return false;
  }
};
