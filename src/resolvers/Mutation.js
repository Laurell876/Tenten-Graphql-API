const { signUp } = require("./Auth.js");
const createListing = require("./listing_mutations/createListing")
const updateListing = require("./listing_mutations/updateListing")
const removeListing = require("./listing_mutations/removeListing")
const addUserImage = require("./user_image_mutations/add_user_image")
const removeUserImage = require("./user_image_mutations/remove_user_image")
const addFavorite = require("./favorite_mutations/add_favorite")
const removeFavorite = require("./favorite_mutations/remove_favorite")
const rateListing = require("./rating_mutations/rate_listing");
const addReview = require("./review_mutations/add_review")
const removeReview = require("./review_mutations/remove_review.js")
const createMessage = require("./chat_mutations/create_message")
const startChat = require("./chat_mutations/start_chat")


const registerV2 = require("./auth_v2_mutations/register_v2");



const Mutation = {
  signUp,
  createListing,
  updateListing,
  removeListing,
  addUserImage,
  removeUserImage,
  addFavorite,
  removeFavorite,
  rateListing,
  addReview,
  removeReview,
  createMessage,
  startChat,
  registerV2
};

module.exports = Mutation;
