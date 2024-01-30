const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    }
},{ timestamps: true,});

const User = mongoose.model("user", userSchema);

module.exports = User;
