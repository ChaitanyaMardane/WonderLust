const express= require("express");
const router= express.Router();
const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require('../ExpressErrors/ExpressErrors.js');
const passport = require("passport");
const { isLoggedin ,isOwner} = require("../middleware.js");
const { validateListings } = require("../middleware.js");





//Routes

router.get("/",wrapAsync(async (req,res)=>{
    let listings= await Listing.find({});
    res.render("Listing/index",{listings})
}))

//New And Create Routes
router.get("/new",
    isLoggedin,
    (req, res)=>{
   
    res.render("Listing/new.ejs");
})
router.post("/",
    isLoggedin,
    validateListings,
    wrapAsync(async (req,res)=>{
    let listing = req.body;
    listing.image = {
        filename: "listingimage",
        url: listing.image.url,
    };
    listing.owner = req.user.id; // Set the owner 
    console.log(listing.owner);
    
    await Listing.create(listing);
    // console.log(listing);
    req.flash("success","New listing  is successfully created ")
    res.redirect("/listing");
   
}))
//Show Route

router.get("/:id",
    wrapAsync(async(req, res)=>{
    let id=req.params.id;
    let listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    // console.log(listing);
    if(!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listing")
    }
    for(let review of listing.reviews){
        console.log(review.author);
    }

    res.render("Listing/show.ejs",{listing});
})) 

//Edit and Update Route
router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(async (req,res)=>{
    let id = req.params.id;
    let listing= await Listing.findById(id);
  
    
    res.render("Listing/edit.ejs",{listing});
}))

router.put("/:id",
    isLoggedin,
    isOwner,
    validateListings,
    wrapAsync(async (req,res)=>{
        const {id} = req.params;
        const listing = req.body;
        listing.image = {
            filename: "listingimage",
            url: listing.image.url
        };
        
    await Listing.findByIdAndUpdate(id, { ...listing }, { runValidators: true });
    req.flash("success","Listing is updated");
    res.redirect(`/listing/${id}`);

}))

//Delete Route
    // delete listing
router.delete("/:id",
    isLoggedin, 
    isOwner, 
    wrapAsync(async (req,res)=>{
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted");
    res.redirect("/listing");
}) )



//Review Route

module.exports= router;