
const { createWriteStream } = require("fs");
const path = require("path");
const {v4} = require('uuid');

module.exports = async (parent, args, context, info) => {
    const { createReadStream, filename } = await args.file;

    // A new file name is generate to prevent conflicts
    const uniqueFilename = v4() + filename; 

    await new Promise(res =>
        createReadStream()
        .pipe(createWriteStream(path.join(__dirname, "../../../images", uniqueFilename)))
        .on("close", res)
    );

    return true;
}