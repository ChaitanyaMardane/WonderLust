
const Listing = require("../models/listing")
module.exports.index = async (req,res)=>{
    let listings= await Listing.find({});
    res.render("Listing/index",{listings})
}
//-------------------------------------------------------------------------------------

module.exports.new = (req, res)=>{
        res.render("Listing/new.ejs");
    }
//-------------------------------------------------------------------------------------


module.exports.create= async (req,res)=>{
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
   
}

//-------------------------------------------------------------------------------------


module.exports.show= async(req, res)=>{
    let id=req.params.id;
    let listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    console.log(listing);
    console.log(listing.reviews);
   
    
    if(!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listing")
    }
    for(let review of listing.reviews){
        // console.log(review.author);
    }

    res.render("Listing/show.ejs",{listing});
}

//-------------------------------------------------------------------------------------

module.exports.edit= async (req,res)=>{
    let id = req.params.id;
    let listing= await Listing.findById(id);
  
    
    res.render("Listing/edit.ejs",{listing});
}

//-------------------------------------------------------------------------------------

module.exports.update= async (req,res)=>{
        const {id} = req.params;
        const listing = req.body;
        listing.image = {
            filename: "listingimage",
            url: listing.image.url
        };
        
    await Listing.findByIdAndUpdate(id, { ...listing }, { runValidators: true });
    req.flash("success","Listing is updated");
    res.redirect(`/listing/${id}`);

}
//-------------------------------------------------------------------------------------

module.exports.delete= async (req,res)=>{
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted");
    res.redirect("/listing");
}