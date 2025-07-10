const mongoose = require('mongoose');
const Review = require("./review.js")
const User = require("./user.js")
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            set : (v)=> v==""? "listingimage": v,
            default: "listingimage",
        },
        url: {
            type: String,
            set: (v) => (!v || v === "") 
                ? "https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o"
                : v,
            default: "https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o",
        }
        
    },
    price: {
        type: Number,
        default: 0, // Default price if none is provided
    },
    location: {
        type: String,},
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' // Reference to the Review model

        }
    ],
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing && listing.reviews.length){
        console.log("Deleting orders associated with the customer...");
        await Review.deleteMany({_id:{$in:listing.reviews}}); // Delete all orders associated with the customer
        console.log("Orders deleted successfully.");
    }
})
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
