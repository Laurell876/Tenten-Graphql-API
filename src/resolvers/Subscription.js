const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const { withFilter } = require("apollo-server-express");

const Subscription = {
  newMessage: {
    subscribe: withFilter(
      (parent, args, context, info) => context.pubsub.asyncIterator("NEW_MESSAGE"),
        (payload, variables) => {
          //console.log(variables.chatId, payload.newMessage.chat._id)
          return variables.chatId ? payload.newMessage.chat._id == variables.chatId : true
        }
    ),
  },
};
module.exports = Subscription;
