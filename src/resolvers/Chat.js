const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");

module.exports = {
  messages: async (parent, args, context, info) => {
    let messages = await Message.find();
    messages = messages.filter((message) => message._doc.chat == parent.id);
    return messages;
  },
  userOne: async (parent, args, context, info) => {
    let user = await User.findOne({ _id: parent._doc.userOne });
    return user;
  },
  userTwo: async (parent, args, context, info) => {
    let user = await User.findOne({ _id: parent._doc.userTwo });
    return user;
  },
  lastMessage: async (parent, args, context, info) => {
    let chat = await Chat.findOne({_id: parent.id})
    //console.log(chat._doc.messages[chat._doc.messages.length -1]) //returns an id
    let lastMessage = await Message.findOne({_id: chat._doc.messages[chat._doc.messages.length -1]})
    return lastMessage
  },
};
