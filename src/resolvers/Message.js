const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");

module.exports = {
  sender: async (parent, args, context, info) => {
    return await User.findOne({_id: parent.sender});
  },
  receiver: async (parent, args, context, info) => {
      return await User.findOne({_id: parent.receiver})
  },
  chat: async (parent, args, context, info) => {
      return await Chat.findOne({_id: parent.chat})
  },
};
