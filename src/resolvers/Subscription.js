const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const { withFilter } = require("apollo-server-express");

const Subscription = {
  newMessage: {
    subscribe: withFilter(
      (parent, args, context, info) => context.pubsub.asyncIterator("NEW_MESSAGE"),
      (payload, variables, context) => payload.newMessage.receiver._id == context.context.currentUserId,
    ),
  },
};
module.exports = Subscription;