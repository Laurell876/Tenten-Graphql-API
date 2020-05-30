const User = require("../../models/User");
const authCheck = require("../functions/authCheck");
const shortid = require("shortid");
const { createWriteStream, mkdir, unlink } = require("fs");
const userCheck = require("../functions/userCheck");

module.exports = async (parent, args, context, info) => {
  authCheck(context);
  try {
    const user = await User.findById(conext.userId);
    userCheck(context, user);
    let userImage = user.image;
    if (user.image) {
      unlink(user.image, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
      user.overwrite({ ...user._doc, image: null });
      await user.save();
    }

    return userImage;
  } catch (e) {
    throw e;
  }
};
