const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");
const mongoose = require("mongoose");
const Review = require("../../models/Review");

module.exports = async (parent, args, context, info) => {
  //ensures user is authenticated
  authCheck(context);

  try {
    //ensure listing exists
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.listingId });
    if (!listing) throw new Error("Listing not found");

    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }


    //create new review
    let review = new Review({
        user: userFound.id,
        listing: listing.id,
        review: args.review
    })

    review = await review.save();

    //add review to listing object
    listing.overwrite({
        ...listing._doc,
        reviews: [...listing._doc.reviews, review._doc]
    })
    await listing.save();


    return review._doc

  } catch (e) {
    throw e;
  }
};
