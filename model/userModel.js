/*------<INTIATE USER MODEL>------*/
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
/*------<INTIATE USER SCHEMA>------*/
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      maxLength: 80,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      maxLength: 80,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
      maxLength: 80,
      minLength: 8,
      required: true,
      selected: false,
    },
    passwordConfirm: {
      type: String,
      maxLength: 80,
      minLength: 8,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    nationalNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "author", "user", "support"],
      default: "user",
    },
    status: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    filesId: { type: mongoose.Types.ObjectId, ref: "Files" },
  },
  {
    timestamps: true,
  }
);
/*------<MIDDLEWARE USER MODEL>------*/
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.nationalNumber = await bcrypt.hash(this.nationalNumber, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
/*------<CONST USER MODEL>------*/
const User = mongoose.model("User", userSchema);
/*------<EXPORT USER MODEL>------*/
module.exports = User;
