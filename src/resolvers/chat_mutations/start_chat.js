const Chat = require("../../models/Chat");
const Message = require("../../models/Message");

const authCheck = require("../functions/authCheck");

const startChat = async (parent, args, context, info) => {
  //authentication check
  authCheck(context);
  try {
      
  } catch (e) {
    throw e;
  }
};

module.exports = startChat;
