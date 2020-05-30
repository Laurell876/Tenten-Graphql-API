const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const removeListing = async (parent, args, context, info) => {
  authCheck(context);

  try {
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.id });
    if (!listing) throw new Error("Listing not found");

    ownerCheck(context, listing);

    
    await listing.deleteOne({_id:listing._id})
    return listing
  } catch (e) {
    throw e;
  }
};

module.exports = removeListing;
