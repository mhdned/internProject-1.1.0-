/*------<VALIDATION MIDDLEWARE>------*/
class UserValidate {
  constructor(pureData) {
    this.pureData = pureData;
    this.error = false;
  }
  isString(arrayData) {
    arrayData.forEach((el) => {
      if (typeof this.pureData[el] !== "string") this.error = true;
    });
    return this;
  }
  isNumber(arrayData) {
    arrayData.forEach((el) => {
      if (typeof this.pureData[el] !== "number") this.error = true;
    });
    return this;
  }
  isBoolean(arrayData) {
    arrayData.forEach((el) => {
      if (typeof this.pureData[el] !== "boolean") this.error = true;
    });
    return this;
  }
  isExist(arrayData) {
    arrayData.forEach((el) => {
      if (!this.pureData[el]) this.error = true;
    });
    return this;
  }
  get() {
    if (this.error) {
      return false;
    } else {
      return this.pureData;
    }
  }
}
/*------<VALIDATION EXPORT>------*/
module.exports = UserValidate;
