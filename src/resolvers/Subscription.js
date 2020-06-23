const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const { withFilter } = require("apollo-server-express");

const Subscription = {
  newMessage: {
    subscribe: withFilter(
      (parent, args, context, info) => {
        //console.log(context.context);
        return context.pubsub.asyncIterator("NEW_MESSAGE");
      },
      (payload, variables, context) => {
        //console.log("context from resolver", context.context);
        //console.log(variables.chatId, payload.newMessage.chat._id)

        //RETURN ALL THE MESSAGES THAT ARE BEING SENT TO THE CURRENT USER
        console.log(payload.newMessage.receiver._id == context.context.currentUserId)
        return payload.newMessage.receiver._id == context.context.currentUserId;
      }
    ),
  },
};
module.exports = Subscription;
