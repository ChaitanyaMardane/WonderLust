const Joi = require('joi');

module.exports.listingSchema =  Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().default("listingimage"),
            url: Joi.string().uri().required().default("https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o")
        }),
        price: Joi.number().min(0).required(),
    
        location: Joi.string().required(),
        // location: Joi.string().required(),
        country: Joi.string().required()
  
});
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  }).required()
});