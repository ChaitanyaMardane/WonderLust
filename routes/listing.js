const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const listing = require("../controller/listing.js")

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require('../ExpressErrors/ExpressErrors.js');
const passport = require("passport");
const { isLoggedin, isOwner } = require("../middleware.js");
const { validateListings } = require("../middleware.js");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const multer = require('multer');
const { storage } = require('../cloudinary.js'); // adjust path as needed

const upload = multer({ storage });


// To avoid using same path for multiple routes we can use router.route
//Index  //New And Create Routes
router.get("/new", isLoggedin, listing.new);
router
    .route("/")
    .get(wrapAsync(listing.index))
    .post(isLoggedin,  upload.single('image[url]',{
        transform: [
            
        ]
    }), 
     // 'image' is the field name in the form
    validateListings, wrapAsync(listing.create));





router.route("/:id")
    .get(wrapAsync(listing.show))
    .put(isLoggedin, isOwner,upload.single('image[url]'),validateListings, wrapAsync(listing.update))
    .delete(isLoggedin, isOwner, wrapAsync(listing.delete));


    //Edit and 
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listing.edit));




// //Index
// router.get("/", wrapAsync(listing.index))

// //New And Create Routes
// router.get("/new", isLoggedin, listing.new);

// Create Routes
// router.post("/",isLoggedin,validateListings,wrapAsync(listing.create));

// //Show Route
// router.get("/:id", wrapAsync(listing.show))


// //Update Route
// router.put("/:id",isLoggedin,isOwner,validateListings,wrapAsync(listing.update));

//Delete Route
// router.delete("/:id",isLoggedin,isOwner,wrapAsync(listing.delete));




module.exports = router;