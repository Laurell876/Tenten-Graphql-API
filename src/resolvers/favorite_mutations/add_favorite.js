const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");
const mongoose = require("mongoose");

module.exports = async (parent, args, context, info) => {
  authCheck(context);
  try {
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.id });
    if (!listing) throw new Error("Listing not found");

    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }


    

    const user = await User.findById(context.userId);
    //console.log(context.userId);

    //checks to see if listing is already favorited
    if(user._doc.favoriteListings.includes(mongoose.Types.ObjectId(listing.id))) {
      throw new Error("Listing already favorited")
    }

    user.overwrite({
      ...user._doc,
      favoriteListings: [...user._doc.favoriteListings, listing.id],
    });

    await user.save();

    return listing;
  } catch (e) {
    throw e;
  }
};
