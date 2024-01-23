const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
// const ObjectId = mongoose.Types.ObjectId;
const isRoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "IsRole",
      required: true,
    },
    // bắt buộc fe phải hỏi be có mấy front để fe bắt trường hợp luôn.
    // role: {
    //   type: String,
    //   required: true
    // },
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
