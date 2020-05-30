const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    bedrooms: {
        type:Number,
        required:true
    },
    bathrooms: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    parish: {
        type:String,
        required:true
    },
    size: {
        type:Number,
        required:true
    },
    rent: {
        type:Number,
        required:true
    },
    owner: {
        type:Schema.Types.ObjectId,
        red:"User",
        required:true
    },
    image: String
})

module.exports = mongoose.model("Listing", listingSchema)