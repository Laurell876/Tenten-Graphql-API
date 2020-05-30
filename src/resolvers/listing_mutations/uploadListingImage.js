const connection = require("../../db.js");
var mongoose = require("mongoose");
const Listing = require("../../models/Listing");

const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const uploadListingImage = async (_, args, context, info) => {

  authCheck(context);
  try {
    //listing exists check
    let listing = await Listing.findOne({ _id: args.id });
    if (!listing) throw new Error("Listing not found");

    //check if current user is the owner of the listing
    ownerCheck(context, listing);

    
    //GRIDFS
    const data = await connection();
    const {
      createReadStream,
      filename,
      mimetype,
      encoding,
    } = await args.file;
    const gridFsBucket = new mongoose.mongo.GridFSBucket(data);
    const uploadStream = gridFsBucket.openUploadStream(filename);
    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(uploadStream)
        .on("error", reject)
        .on("finish", resolve);
    });


    //check to see if the listing already has an image if so delete that image
    if(listing.image) {
        await gridFsBucket.delete(mongoose.Types.ObjectId(listing.image))
    }

    listing.overwrite({...listing._doc, image: uploadStream.id})
    await listing.save()

    return { id: uploadStream.id, filename, mimetype, encoding };
  } catch (e) {
    throw e;
  }
};

module.exports = uploadListingImage;
