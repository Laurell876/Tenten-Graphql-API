const User = require("../models/User")



const Listing = {
    owner: async (parent, args,context, info)=> {
        return await User.findById(parent.owner)
    }
}


module.exports = Listing