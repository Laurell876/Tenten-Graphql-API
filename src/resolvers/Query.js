const User = require("../models/User");
const { login } = require("./Auth");
const Listing = require("../models/Listing");


const Query = {
  users: async (parent, args, context, info) => {
    try {
      if (args.id) {
        const users = await User.find({_id:args.id});
        if (!users[0]) throw new Error("User not found");
        else
          return users.map(user=>{
            return {
            ...user._doc,
            password: null,
            }
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
  listings: async(parent,args,context,info)=> {
    try {
      if(args.id) {
        const listingFound = await Listing.find({_id:args.id})
        if(!listingFound[0]) {
          throw new Error("Listing not found")
        }
        return listingFound;
      } else {
        return await Listing.find()
      }
    } catch (e) {
      throw e;
    }
  }
};

module.exports = Query;
