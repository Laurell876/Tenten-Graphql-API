const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat: {
    type:Schema.Types.ObjectId,
    ref:"Chat",
    required:true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);

