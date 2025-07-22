const { cloudinary } = require('./cloudinary');

cloudinary.uploader.destroy('uploads/pdsgk4d5xrhiyyu02kee', function (error, result) {
  console.log(result, error);
});
// This code snippet is used to delete an image from Cloudinary using its public ID.