const connection = require("../../db.js");
var mongoose = require("mongoose");
const Listing = require("../../models/Listing");

const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const deleteListingImage = async (parent, args, context, info) => {
  try {
    authCheck(context);
    //listing exists check
    let listing = await Listing.findOne({ _id: args.listingId });
    if (!listing) throw new Error("Listing not found");

    //check if current user is the owner of the listing
    ownerCheck(context, listing);

    if (!listing.image) {
      throw new Error("Listing does not have an image");
    }
    {
      const data = await connection();

      const gridFsBucket = new mongoose.mongo.GridFSBucket(data);

      const filefound = await gridFsBucket.find(
        mongoose.Types.ObjectId(listing.image)
      );
        

      if (filefound) {
        await gridFsBucket.delete(mongoose.Types.ObjectId(listing.image));
      }

      listing.overwrite({...listing._doc, image:null})
      await listing.save()
      return "Image deleted";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = deleteListingImage;
