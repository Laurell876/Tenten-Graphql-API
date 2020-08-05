
const User = require("../../models/User");
const authCheck = require("../functions/authCheck");

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

module.exports = async (parent, args, context, info) => {
    authCheck(context);


    let userImage = null;
    if(args.file) {
        //console.log("file present")
        const id = shortid.generate();

        const { createReadStream, filename } = await args.file;
        //console.log(args.file)
  
  
        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../../../images", `/${id}-${filename}`)
            )
          )
          .on("close",res)
        );
  
        userImage = `images/${id}-${filename}`
    }

    return await User.findByIdAndUpdate(
        { _id: context.userId },
        {
            $set: {
                ...args.data,
                image: userImage
            }
        },
        {
            new:true //returns the document after the update
        }
    )


}