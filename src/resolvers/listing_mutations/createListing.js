const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");

const createListing = async (parent, args, context, info) => {
  //authentication check
  authCheck(context)
  try {
    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }

    let newListing = new Listing({
        ...args.data,
        owner:context.userId
    })

    newListing = await newListing.save();

    return {
        ...newListing._doc
    }


  } catch (e) {
    throw e;
  }
};

module.exports = createListing;
