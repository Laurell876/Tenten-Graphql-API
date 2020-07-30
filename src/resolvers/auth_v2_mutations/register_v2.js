

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerV2 = async (parent, args, context, info) => {
    // Checks to see if user exists
    const emailTaken = await User.findOne({ email: args.data.email });

    if (emailTaken) throw new Error("Email address taken.");
    
    const hashedPassword = await bcrypt.hash(args.data.password, 12);

    // User is stored in database
    let user = new User({
      ...args.data,
      password: hashedPassword,
    });

    user = await user.save();

    const userId = user.id;
    // Token is created and signed
    const token = await jwt.sign(
      { userId: userId, firstName: user._doc.firstName, lastName: user._doc.lastName, email: user._doc.email },
      "somesupersecretkey"
    );

    return {
        userId: userId,
      token: token,
    };
}

module.exports = registerV2