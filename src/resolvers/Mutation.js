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
const loginV2 = require("./auth_v2_mutations/login_V2");
const revokeRefreshTokensForUser = require("./auth_v2_mutations/revoke_refresh_tokens_for_user");
const logout =  require("./auth_v2_mutations/logout");


const uploadFile = require("./upload_file_test_mutations/upload_file");

const updateUser = require("./user_mutations/update_user");

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


  
  registerV2,
  loginV2,
  revokeRefreshTokensForUser,
  logout,

  uploadFile,

  updateUser
};

module.exports = Mutation;
