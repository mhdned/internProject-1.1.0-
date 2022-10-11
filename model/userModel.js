/*------<INTIATE USER MODEL>------*/
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
/*------<INTIATE USER SCHEMA>------*/
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    maxLength: 80,
    required: true,
  },
  fullName: {
    type: String,
    maxLength: 80,
    required: true,
  },
  email: {
    type: String,
    required: true,
    valodate: {
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
  },
  passwordConfirm: {
    type: String,
    maxLength: 80,
    minLength: 8,
    required: true,
    valodate: {
      validator: (value) => {
        return value === this.password;
      },
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  nationalNumber: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["admin", "author", "user"], default: "user" },
  status: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  filesId: { type: mongoose.Types.ObjectId, ref: "Files" },
},
{
  timestamps : true
});
/*------<MIDDLEWARE USER MODEL>------*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.updatedAt = undefined;
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};
/*------<CONST USER MODEL>------*/
const User = mongoose.model("User", userSchema);
/*------<EXPORT USER MODEL>------*/
module.exports = User;
