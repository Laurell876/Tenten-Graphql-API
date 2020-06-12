const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");




const Subscription = {
  newMessage: {
    subscribe: async (parent, args, context, info) => {
      return context.pubsub.asyncIterator("NEW_MESSAGE");
    },
  },
};
module.exports = Subscription