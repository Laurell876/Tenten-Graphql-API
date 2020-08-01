

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {createRefreshToken} = require("../../../auth_v2");
const {createAccessToken} = require("../../../auth_v2");
const sendRefreshtoken = require("../../../send_refresh_token");




const logoutV2 = async (parent, args, context, info) => {
    sendRefreshtoken(context.res, "")
    return true
}

module.exports = logoutV2