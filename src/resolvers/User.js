const Listing = require("../models/Listing")
const Chat = require("../models/Chat")


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
    },
    chats: async(parent, args,context,info)=> {
        const chats = await Chat.find({_id: {
            $in: [...parent.chats]
        }})
        return chats
    }
}

module.exports = User