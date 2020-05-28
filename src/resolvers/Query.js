const User = require("../models/User");
const { login } = require("./Auth");

const Query = {
  users: async (parent, args, context, info) => {
    try {
      if (args.id) {
        const users = await User.find({_id:args.id});
        if (!users[0]) throw new Error("User not found");
        else
          return users.map(user=>{
            return {
            ...user._doc,
            password: null,
            }
          });
      } else {
        const users = await User.find();
        return users.map((user) => {
          return { ...user._doc, password: null };
        });
      }
    } catch (e) {
      throw e;
    }
  },
  login
};

module.exports = Query;
