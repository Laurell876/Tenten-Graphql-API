const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const { withFilter } = require("apollo-server-express");

const Subscription = {
  newMessage: {
    subscribe: withFilter(
      (parent, args, context, info) =>{ console.log(context.context); return context.pubsub.asyncIterator("NEW_MESSAGE")},
        (payload, variables,context) => {
          console.log("context from resolver");
          //console.log(variables.chatId, payload.newMessage.chat._id)
          return true
        }
    ),
  },
};
module.exports = Subscription;
