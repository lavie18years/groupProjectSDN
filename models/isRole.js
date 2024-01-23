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
// ko để người dùng nhập
// đưa api cho front -end để bên fe lấy data hiện ra và chọn  để nó gửi id về phía be
var IsRole = mongoose.model("IsRole", isRoleSchema);

module.exports = IsRole;
