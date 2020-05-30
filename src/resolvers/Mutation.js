const { signUp } = require("./Auth.js");
const createListing = require("./listing_mutations/createListing")
const updateListing = require("./listing_mutations/updateListing")
const removeListing = require("./listing_mutations/removeListing")

const Mutation = {
  signUp,
  createListing,
  updateListing,
  removeListing
};

module.exports = Mutation;
