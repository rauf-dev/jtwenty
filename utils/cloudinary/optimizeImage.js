const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const cloudinaryConfig = require('./cloudinaryConfig.js');
dotenv.config();

// function that takes in image name, applies optimization settings and returns the optimized image url
// transformations can be done in advance
// optimization settings can only be applied on the fly because until then the client device type/browser is unknown

const createOptimizedImageUrl = async function (imageName, transformationName) {
  // init cloudinary
  cloudinaryConfig;

  const url = await cloudinary.url(imageName, {
    if: 'w_gt_1200',
    width: 1200,
    // quality: 'auto',

    chain: {
      if: 'h_gt_550',
      height: 550,
      // quality: 'auto',
    },
  });
  return url;
};

// const createOptimizedImageUrl = async function (imageName, transformationName) {
//   // init cloudinary
//   cloudinaryConfig;

//   return await cloudinary.url(imageName, {
//     secure: true,
//     transformation: [
//       { transformation: transformationName },
//       { quality: 'auto' },
//       { fetch_format: 'auto'},
//     ],
//   });
// };

module.exports = createOptimizedImageUrl;
