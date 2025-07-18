const Listing = require("../models/listing")
const Review = require("../models/review")

//-------------------------------------------------------------------------------------

module.exports.create = async (req,res)=>{
    let listing = await Listing.findById(`${req.params.id}`);
    let newreview=req.body.review;
    newreview.author=req.user.id; // Set the author of the review
    const reviewDoc = await Review.create(newreview);
    console.log(newreview.author);

    listing.reviews.push(reviewDoc._id); // Push the review ID to the listing's reviews array
    console.log(listing.reviews);
    await listing.save();
    req.flash("success","Review Added Successfully")

    res.redirect(`/listing/${listing._id}`)   

}

//-------------------------------------------------------------------------------------


module.exports.delete = async(req,res)=>{
    let rid=req.params.rid;
    await Review.findByIdAndDelete(rid);
    await Listing.findByIdAndUpdate(req.params.id,{$pull:{reviews:rid}})
     req.flash("success","Review Deleted")
    res.redirect(`/listing/${req.params.id}`);

}
