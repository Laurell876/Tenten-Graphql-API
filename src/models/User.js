const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tokenVersion: {
    type: Number,
    default:0
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail, "invalid email"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  defaultParish: String,
  createdListings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  favoriteListings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  messagesSent: [
    {
      type: Schema.Types.ObjectId,
      ref:"Message"
    }
  ],
  messagesReceived: [
    {
      type: Schema.Types.ObjectId,
      ref:"Message"
    }
  ],
  chats: [
    {
      type:Schema.Types.ObjectId,
      ref:"Chat"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
