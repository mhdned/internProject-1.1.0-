const validator = require("validator");
/*------<VALIDATION MIDDLEWARE>------*/
exports.userUpdateValidations = (data, res) => {
  try {
    if (
      !data.userName ||
      !data.password ||
      !data.passwordConfirm ||
      !data.email ||
      !data.phoneNumber ||
      !data.nationalNumber
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID DATA | 👮‍♂️");
    }
    if (
      typeof data.userName !== "string" ||
      data.userName.search(/(\s)/g) !== -1
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID USERNAME | 👮‍♂️");
    }
    if (
      typeof data.password !== "string" ||
      data.password.search(/(\s)/g) !== -1
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PASSWORD | 👮‍♂️");
    }
    if (data.password !== data.passwordConfirm) {
      return res
        .status(400)
        .send("CLIENT ERROR :: COMPARE PASSWORD IS WRONG | 👮‍♂️");
    }
    if (data.password !== data.passwordConfirm) {
      return res
        .status(400)
        .send("CLIENT ERROR :: COMPARE PASSWORD IS WRONG | 👮‍♂️");
    }
    if (!validator.isEmail(data.email)) {
      return res.status(400).send("CLIENT ERROR :: INVALID EMAIL | 👮‍♂️");
    }
    if (
      !data.phoneNumber.startsWith("0") ||
      typeof (data.phoneNumber * 1) !== "number"
    ) {
      return res.status(400).send("CLIENT ERROR :: INVALID PHONE NUMBER | 👮‍♂️");
    }
    return data;
  } catch (error) {
    /*------<X><SERVER ERROR>------*/
    console.log(error);
    return res.status(500).send("SERVER ERROR :: VALIDATION FAILED | 🔌");
  }
};
