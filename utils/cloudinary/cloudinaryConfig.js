const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Init Cloudinary ################################
dotenv.config();
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log('process.env.CLOUDINARY_CLOUD_NAME');
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);

module.exports = cloudinaryConfig;

