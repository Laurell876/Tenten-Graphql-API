const User = require("../models/User");
const Review = require("../models/Review");

const Listing = {
  owner: async (parent, args, context, info) => {
    return await User.findById(parent.owner);
  },
  reviews: async (parent, args, context, info) => {
    let reviews = await Review.find();
    console.log(reviews)
    console.log(parent.id)
    reviews = reviews.filter((review) => review.listing == parent.id);
    return reviews
  },
};

module.exports = Listing;
