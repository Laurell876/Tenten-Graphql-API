const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const shortid = require("shortid");
const userCheck = require("../functions/userCheck");
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

const addUserImage = async (parent, args, context, info) => {
  authCheck(context);

  try {
    const user = await User.findById(context.userId);
    userCheck(context, user);

    //if user already has an image that image is deleted from the file system
    if (user.image) {
      unlink(user.image, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    }

    //UPLOADING LISTING IMAGE

    // Creates an images folder in the root directory
    mkdir("images", { recursive: true }, (err) => {
      if (err) throw err;
    });
    // Process upload
    upload = await processUpload(args.file);
    let userImage = upload.path;

    user.overwrite({ ...user._doc, image: userImage });
    await user.save();

    return userImage;
  } catch (e) {
    throw e;
  }
};

module.exports = addUserImage;
