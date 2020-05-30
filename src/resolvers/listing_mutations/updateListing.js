const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");


const updateListing = async (parent, args, context, info) => {
  authCheck(context);

  try {
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.data.id });
    if (!listing) throw new Error("Listing not found");

    ownerCheck(context, listing);
    

    //overwrites specific fields
    listing.overwrite({...listing._doc,...args.data});
    await listing.save()

    return listing;
  } catch (e) {
    throw e;
  }
};


module.exports = updateListing