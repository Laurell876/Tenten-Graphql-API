const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const shortid = require("shortid");
const { createWriteStream, mkdir, unlink } = require("fs");

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

const updateListing = async (parent, args, context, info) => {
  authCheck(context);

  try {
    //checks to see if listing exists
    let listing = await Listing.findOne({ _id: args.data.id });
    if (!listing) throw new Error("Listing not found");

    ownerCheck(context, listing);

    //UPLOADING LISTING IMAGE
    let listingImage = listing.image;
    let upload;


    if (args.file) {
      //if the listing already has an image delete it from the images folder
      if (listing.image) {
        unlink(listing.image, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }

      // Creates an images folder in the root directory
      mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Process upload
      upload = await processUpload(args.file);
      //console.log(upload)
      listingImage = upload.path;
    }

    //overwrites specific fields
    listing.overwrite({ ...listing._doc,image:listingImage, ...args.data });
    await listing.save();

    return listing;
  } catch (e) {
    throw e;
  }
};

module.exports = updateListing;
