const { signUp } = require("./Auth.js");
const createListing = require("./listing_mutations/createListing")
const updateListing = require("./listing_mutations/updateListing")
const removeListing = require("./listing_mutations/removeListing")
const uploadListingImage = require("./listing_mutations/uploadListingImage")
const deleteListingImage = require("./listing_mutations/deleteListingImage")

const Mutation = {
  signUp,
  createListing,
  updateListing,
  removeListing,
  uploadListingImage,
  deleteListingImage
};

module.exports = Mutation;
