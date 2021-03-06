const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  parish: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 3,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  allRatings: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      userRating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
});

module.exports = mongoose.model("Listing", listingSchema);
