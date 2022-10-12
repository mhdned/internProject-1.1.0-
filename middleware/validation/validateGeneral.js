/*------<VALIDATION MIDDLEWARE>------*/
class GeneralValidate {
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
        if (!this.pureData.hasOwnProperty(el)) this.error = true;
      });
      return this;
    }
    isTrue(data){
      if (this.pureData[data] !== true) this.error = true;
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
  module.exports = GeneralValidate;
  