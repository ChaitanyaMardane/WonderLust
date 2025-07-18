const express= require("express");
const router= express.Router({mergeParams:true});
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReviews,isLoggedin ,isReviewAuthor} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require('../ExpressErrors/ExpressErrors.js');
const review= require("../controller/review.js")


//Create review
router.post("/",isLoggedin,validateReviews, wrapAsync (review.create));

//delete lsiting reviews
router.delete("/:rid",isLoggedin,isReviewAuthor, wrapAsync(review.delete));


module.exports=router;
