const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");
const mongoose = require("mongoose");

module.exports = async (parent, args, context, info) => {
  //ensures user is authenticated
  authCheck(context);
  try {
    //ensure listing exists
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.id });
    if (!listing) throw new Error("Listing not found");

    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }

    //checks to see if another rating exists by the same user
    const listingRatings = listing.allRatings;
    const listingExists = listingRatings.filter(
      (rating) => rating.userId == context.userId
    );

    //if a listing was found delete it
    //TODO
    if(listingExists.length!=0) {
        listing.overwrite({
            ...listing._doc,
            allRatings: listing._doc.allRatings.filter(rating=>rating.userId!=context.userId)
        })
        await listing.save();
    }


    const newRating = {
      userId: context.userId,
      userRating: args.value,
    };

    //ADDS NEW RATING TO LISTING'S ALL RATINGS ARRAY
    listing.overwrite({
      ...listing._doc,
      allRatings: [
        ...listing._doc.allRatings,
        newRating
      ],
    });

    await listing.save();

    console.log(args.value);

    return newRating 
  } catch (e) {
    throw e;
  }
};
