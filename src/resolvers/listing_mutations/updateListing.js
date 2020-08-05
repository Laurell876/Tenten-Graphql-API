const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const ownerCheck = require("../functions/ownerCheck");

const shortid = require("shortid");
const { createWriteStream, mkdir, unlink } = require("fs");
const path = require("path");


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
      const id = shortid.generate();

      const { createReadStream, filename } = await args.file;
      //console.log(args.file)


      const upload = await new Promise((res) =>
        createReadStream().pipe(
          createWriteStream(
            path.join(__dirname, "../../../images", `/${id}-${filename}`)
          )
        )
        .on("close",res)
      );

      listingImage = `images/${id}-${filename}`
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
