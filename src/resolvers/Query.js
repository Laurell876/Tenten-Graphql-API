const User = require("../models/User");
const { login } = require("./Auth");
const Listing = require("../models/Listing");
const authCheck = require("./functions/authCheck");
const Review = require("../models/Review");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Query = {
  me: async (parent, args, context, info) => {
    //authentication check
    authCheck(context);

    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }

    return {
      ...userFound._doc,
      password: null,
    };
    try {
    } catch (e) {
      throw e;
    }
  },
  users: async (parent, args, context, info) => {
    try {
      if (args.id) {
        const users = await User.find({ _id: args.id });
        if (!users[0]) throw new Error("User not found");
        else
          return users.map((user) => {
            return {
              ...user._doc,
              password: null,
            };
          });
      } else {
        const users = await User.find();
        return users.map((user) => {
          return { ...user._doc, password: null };
        });
      }
    } catch (e) {
      throw e;
    }
  },
  login,
  listings: async (parent, args, context, info) => {
    try {
      if (args.id) {
        const listingFound = await Listing.find({ _id: args.id });
        if (!listingFound[0]) {
          throw new Error("Listing not found");
        }
        return listingFound;
      } else {
        return await Listing.find();
      }
    } catch (e) {
      throw e;
    }
  },
  reviews: async (parent, args, context, info) => {
    try {
      if (args.listingId) {
        //check if listing exists
        const listingFound = await Listing.find({ _id: args.listingId });
        if (!listingFound[0]) {
          throw new Error("Listing not found");
        }

        //return all the reviews that belong to this listing
        let reviews = await Review.find();
        reviews = reviews.filter((review) => (review.listing = args.listingId));
        return reviews;
      } else {
        //return all reviews
        return await Review.find();
      }
    } catch (e) {
      throw e;
    }
  },
  chats: async (parent, args, context, info) => {
    try {
      return await Chat.find();
    } catch (e) {
      throw e;
    }
  },
  messages: async (parent, args, context, info) => {
    try {
      if (args.chatId) {
        let messages = await Message.find();
        messages = messages.filter(message=>message._doc.chat == args.chatId );
        return messages;
      }
      return await Message.find();
    } catch (e) {
      throw e;
    }
  },
};

module.exports = Query;
