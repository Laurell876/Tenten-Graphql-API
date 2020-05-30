const User = require("../../models/User");
const Listing = require("../../models/Listing");
const authCheck = require("../functions/authCheck");

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

    //checks to see if listing is in the user's favoriteListings field
    // const listingIsFavorite = userFound._doc.favoriteListings.includes(listing.id);

    // if(!listingIsFavorite) {
    //     throw new Error("Listing is not currently favorited")
    // }

    // console.log()

    // const newFavorites = userFound._doc.favoriteListings.filter((favorite) => {
    //     return favorite._id !== args.
    // })


    const index = userFound._doc.favoriteListings.indexOf(listing.id);
    if(index==-1) {
        throw new Error("Listing is not favorited")
    }
    //unfavorites listing
    userFound._doc.favoriteListings.splice(index,1)



    userFound.overwrite({...userFound._doc, favoriteListings: userFound._doc.favoriteListings})
    await userFound.save()

    return listing;
  } catch (e) {
    throw e;
  }
};
