const express= require("express");
const router= express.Router({mergeParams:true});
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReviews,isLoggedin ,isReviewAuthor} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require('../ExpressErrors/ExpressErrors.js');



//Create review
router.post("/",
     isLoggedin,
    validateReviews,
   
    wrapAsync (async (req,res)=>{
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

}))
//delete lsiting reviews
router.delete("/:rid",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(async(req,res)=>{
    let rid=req.params.rid;
    await Review.findByIdAndDelete(rid);
    await Listing.findByIdAndUpdate(req.params.id,{$pull:{reviews:rid}})
     req.flash("success","Review Deleted")
    res.redirect(`/listing/${req.params.id}`);

}))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                



module.exports=router;
