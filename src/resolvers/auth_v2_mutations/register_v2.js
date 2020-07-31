

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {createRefreshToken} = require("../../../auth_v2");
const {createAccessToken} = require("../../../auth_v2");

const registerV2 = async (parent, args, context, info) => {
    // Checks to see if user exists
    const emailTaken = await User.findOne({ email: args.data.email });

    if (emailTaken) throw new Error("Email address taken.");
    
    const hashedPassword = await bcrypt.hash(args.data.password, 12);

    // User is stored in database
    let user = new User({
      ...args.data,
      tokenVersion: 0,
      password: hashedPassword,
    });

    user = await user.save();

    const userId = user.id; 
    // Token is created and signed
    const token = await createAccessToken(user);


    // send refresh token as cookie
    context.res.cookie(
        "refresh_token", 
        await createRefreshToken(user),
        {
            httpOnly:true
        }
    ) // first parameter is a random id name, the second param is the actual token, the fourth param are options for the cookie itself


    return {
        userId: userId,
        token: token,
    };
}

module.exports = registerV2