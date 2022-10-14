/*------<INTIATE FILES MODEL>------*/
const mongoose = require("mongoose");
/*------<FILES SCHEMA>------*/
const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    formatFile: {
      type: String,
    },
    size: {
      type: Number,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
/*------<CONST FILES MODEL>------*/
const Files = mongoose.model("Files", fileSchema);
/*------<EXPORT FILES MODEL>------*/
module.exports = Files;
