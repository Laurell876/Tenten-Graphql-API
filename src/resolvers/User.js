const Listing = require("../models/Listing")



const User = {
    createdListings: async (parent, args, context, info)=> {
        const listings = await Listing.find({
            _id: {
                $in: [...parent.createdListings]
            }
        })
        return listings
    },
    favoriteListings: async (parent,args,context,info)=> {
        const listings = await Listing.find({
            _id: {
                $in: [...parent.favoriteListings]
            }
        })
        return listings
    }
}

module.exports = User