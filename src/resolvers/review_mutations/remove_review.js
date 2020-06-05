const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");
const mongoose = require("mongoose");
const Review = require("../../models/Review");

module.exports = async (parent, args, context, info) => {
  //ensures user is authenticated
  authCheck(context);

  try {
    //CHECK THAT THE REVIEW EXISTS
    const foundReview = await Review.findOne({ _id: args.id });
    if (!foundReview) throw new Error("Review does not exist");

    //CHECK THAT THE USER CREATED THE REVIEW
    const createdReview = foundReview.user == context.userId;
    if (!createdReview)
      throw new Error("User does not have the required permissions");

    //DELETE REVIEW
    await foundReview.deleteOne({ _id: args.id });

    //DELETE REVIEW FROM LISTING
    const listing = await Listing.findOne({ _id: foundReview.listing });
    listing.overwrite({
      ...listing._doc,
      reviews: listing._doc.reviews.filter((review) => review != foundReview.id),
    });
    await listing.save()
    //console.log(listing);

    return foundReview._doc;

    //DELETE REVIEW FROM USER - not necessary at this time
  } catch (e) {
    throw e;
  }
};
