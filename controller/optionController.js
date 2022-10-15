/*------<INTIATE OPTION CONTROLLER>------*/
const Option = require("./../model/optionModel");
const asyncHandler = require("express-async-handler");
/*------<MRTHODS OPTION CONTROLLER>------*/
exports.generateCode = asyncHandler(async (status, key) => {
  let uniqueCode = await Option.findOne({ key: key });
  let finalCode = "";
  if (!uniqueCode) {
    uniqueCode = await Option.create({ key, value: "0" });
    finalCode = uniqueCode.value;
  } else {
    uniqueCode = await Option.findOneAndUpdate(
      { key },
      { value: uniqueCode.value + 1 },
      { new: true }
    );
    finalCode = uniqueCode.value;
  }
  let today = new Date();
  let uniqueKey;
  uniqueKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
  uniqueKey += `-${status}`;
  uniqueKey += `-${finalCode}`;

  return uniqueKey;
});
