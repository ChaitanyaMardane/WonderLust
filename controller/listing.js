
const { cloudinary } = require("../cloudinary");
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
    
if(req.file){
    req.body.image = {
        filename: req.file.filename, // Assuming req.file is set by multer
       url: req.file.path // Assuming req.file is set by multer
    };
}
    let listing = req.body;
    listing.owner = req.user.id; // Set the owner

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
  if(!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listing")
    }

    let originalImage = listing.image.url; // Store the original image URL
    originalImage = originalImage.replace("/upload", '/upload/c_fill,w_250,h_300,f_auto,q_auto'); // Adjust the URL for display
    console.log(originalImage);

    res.render("Listing/edit.ejs",{listing, originalImage});
}

//-------------------------------------------------------------------------------------

module.exports.update= async (req,res)=>{
        const {id} = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body }, { runValidators: true });

        if(req.file){
    // If an image is uploaded, update the image field
    //delete the old image if necessary
    if(listing.image && listing.image.filename){
        cloudinary.uploader.destroy(listing.image.filename);
        console.log("Old image deleted (if applicable)");
    }
    listing.image = {
        filename: req.file.filename, // Assuming req.file is set by multer
       url: req.file.path // Assuming req.file is set by multer
    };
    await listing.save();
    console.log("Image updated successfully");
}
       
      
        
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