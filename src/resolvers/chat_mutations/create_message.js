const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");
const mongoose = require("mongoose");
const Message = require("../../models/Message");
const Chat = require("../../models/Chat");

module.exports = async (parent, args, context, info) => {
  authCheck(context);
  try {
    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }

    //ensure receiver exists
    let receiverFound = await User.findOne({ _id: args.data.receiver });
    if (!receiverFound) {
      throw new Error("User does not exist");
    }

    //ensure that chat exists
    let chatFound = await Chat.findOne({ _id: args.data.chat });
    if (!chatFound) throw new Error("Chat does not exist");

    //CREATE MESSAGE
    let message = new Message({
      ...args.data,
      sender: userFound.id,
      createdAt: new Date(),
    });

    message = await message.save();

    //add message to the chat's messages field
    chatFound.overwrite({
      ...chatFound._doc,
      messages: [...chatFound._doc.messages, message]
    })

    await chatFound.save()

    //calls subscription
    context.pubsub.publish("NEW_MESSAGE", {
      newMessage: {
        ...message._doc,
      },
    });

    return {
      ...message._doc,
    };
  } catch (e) {
    throw e;
  }
};
