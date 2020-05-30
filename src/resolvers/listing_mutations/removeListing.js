const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const { createWriteStream, mkdir, unlink } = require("fs");



const removeListing = async (parent, args, context, info) => {
  authCheck(context);

  try {
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.id });
    if (!listing) throw new Error("Listing not found");

    ownerCheck(context, listing);

    //if the listing had an image present on the server delete that image
    if (listing.image) {
      unlink(listing.image, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    }

    await listing.deleteOne({ _id: listing._id });
    return listing;
  } catch (e) {
    throw e;
  }
};

module.exports = removeListing;
