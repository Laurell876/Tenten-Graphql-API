

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {createRefreshToken} = require("../../../auth_v2");
const {createAccessToken} = require("../../../auth_v2");
const sendRefreshtoken = require("../../../send_refresh_token");




const loginV2 = async (parent, args, context, info) => {
    // Check if user exists
    const user = await User.findOne({ email: args.data.email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // Validates credentials
    const isEqual = await bcrypt.compare(
      args.data.password,
      user._doc.password
    );

    if (!isEqual) {
      throw new Error("Invalid Credentials");
    }

    const userId = user.id; 
    // Token is created and signed
    const token = await createAccessToken(user);

    // send refresh token as cookie
    let newRefreshToken = await createRefreshToken(user)
    sendRefreshtoken(context.res, newRefreshToken)

    return {
      user: user._doc,
      accessToken: token,
    };
}

module.exports = loginV2