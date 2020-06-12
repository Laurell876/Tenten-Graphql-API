const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  userOne: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  userTwo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
});

module.exports = mongoose.model("Chat", chatSchema);
