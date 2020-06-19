const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");

const startChat = async (parent, args, context, info) => {
  //authentication check
  authCheck(context);
  try {
    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }

    //checks to see if second user exists
    let secondUserFound = await User.findOne({ _id: args.userTwo });
    if (!secondUserFound) {
      throw new Error("Second User does not exist");
    }

    //ensure chat is not being started with the same people
    if(context.userId == secondUserFound.id) throw new Error("A Chat has to be started with two different people");

    //CHECKS TO SEE IF ANOTHER CHAT WITH THE SAME USERS EXISTS
    let chats = await Chat.find();
    let chatExists = chats.filter(
      (chat) =>
        chat._doc.userTwo.toString() == args.userTwo
    );
    //console.log(chatExists)
    if (chatExists.length > 0) throw new Error("Chat already exists");

    //CREATE CHAT
    let newChat = new Chat({
      ...args,
      userOne: userFound.id,
    });

    newChat = await newChat.save();

    //add chat to both user's chats field
    userFound.overwrite({
      ...userFound._doc,
      chats: [...userFound._doc.chats, newChat]
    })

    await userFound.save()

    secondUserFound.overwrite({
      ...secondUserFound._doc,
      chats: [...secondUserFound._doc.chats, newChat]
    })

    await secondUserFound.save()

    return newChat
  } catch (e) {
    throw e;
  }
};

module.exports = startChat;
