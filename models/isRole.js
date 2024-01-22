const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const ObjectId = mongoose.Types.ObjectId;

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

var IsRole = mongoose.model("IsRole", isRoleSchema);

module.exports = IsRole;
