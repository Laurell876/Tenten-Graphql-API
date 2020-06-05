const User = require("../models/User");
const Listing = require("../models/Listing");

const Review = {
    user: async(parent,args,context,info) => {
        const user = await User.findOne({_id: parent.user})
        return user._doc
    },
    listing: async(parent,args,context,info)=> {
        const listing = await Listing.findOne({_id: parent.listing})
        return listing._doc
    }
};

module.exports = Review;
