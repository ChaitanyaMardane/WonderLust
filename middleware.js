
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require('./ExpressErrors/ExpressErrors.js');
const { listingSchema, reviewSchema } = require("./schema.js");
module.exports.isLoggedin=(req ,res ,next)=>{
          req.session.redirectedUrl=req.originalUrl;
    console.log(req.originalUrl)
    if(!req.isAuthenticated()){
    
    req.flash("error","You are not registered")
     return res.redirect('/login')
   }
   next();

}; 
module.exports.saveRedirectUrl =(req,res,next)=>{
  // console.log(res.locals.redirectedUrl);
if(req.session.redirectedUrl){
  res.locals.redirectedUrl=req.session.redirectedUrl;
  console.log(res.locals.redirectedUrl);
  
}
next();
}

module.exports.isOwner=(req,res,next)=>{
  const {id} = req.params;
  Listing.findById(id)
    .then(listing => {
      if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
      }
      if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You dont have the authorization of this listing");
        return res.redirect(`/listing/${id}`);
      }
      next();
    })
    .catch(err => {
      req.flash("error", "Something went wrong");
      res.redirect("/listing");
    });
}

module.exports.validateListings = (req,res,next)=>{
    console.log(req.body);

    const {error}=listingSchema.validate(req.body ,{ abortEarly: false });
    if(error){
        const msg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
     
}
module.exports.validateReviews = (req,res,next)=> {
    const {review} = req.body;
    console.dir(req.body);
    const {error}=reviewSchema.validate(req.body ,{ abortEarly: false });
 if(error){
        const msg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}
 module.exports.isReviewAuthor = async (req, res, next) => {
      const {rid} = req.params;
     const review= await Review.findById(rid);
      if (!review.author._id.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listing/${req.params.id}`);
      }
      else
      next();
    }