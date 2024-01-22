const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
// const ObjectId = mongoose.Types.ObjectId;

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

var Accounts = mongoose.model("Account", accountSchema);

module.exports = Accounts;