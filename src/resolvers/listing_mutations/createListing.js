const Listing = require("../../models/Listing");
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");

const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");
//const File = require("./fileModel");

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

const createListing = async (parent, args, context, info) => {
  //authentication check
  authCheck(context);
  try {
    //gets user in token - to be used later on
    let userFound = await User.findOne({ _id: context.userId });
    if (!userFound) {
      throw new Error("User does not exist");
    }


    let listingImage=null
    let upload
    //UPLOADING LISTING IMAGE
    if (args.file) {
      // Creates an images folder in the root directory
      mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Process upload
      upload = await processUpload(args.file);
      //console.log(upload)
      listingImage = upload.path
    }



    let newListing = new Listing({
      ...args.data,
      image: listingImage,
      owner: context.userId,
    });

    newListing = await newListing.save();

    return {
      ...newListing._doc,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = createListing;
