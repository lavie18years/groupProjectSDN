const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    content: {
        type: String,
    },
    
    
},{ timestamps: true,});

const Feedback = mongoose.model("feedback", feedbackSchema);
module.exports = Feedback;