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


// create url for landing page which includes the album name as text overlay
const createLandingPageUrl = async function (imageName, albumName) {
  const wordsAlbumName = albumName.split(' ');
  const capitalizedAlbumName = wordsAlbumName.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const url = await cloudinary.url(imageName, {
    transformation: [
      { crop: 'fill', width: 514, height: 514, quality: 'auto', fetch_format: 'auto' },
      { color: '#FB8500', overlay: { font_family: 'helvetica', font_size: 60, font_weight: 'bold', text_align: 'center', text: capitalizedAlbumName}, width: 500, height: 500, crop: 'fit'  },
      { flags: 'layer_apply', gravity: "south", y: 20},
    ],
  });
  return url;
};

module.exports = { createOptimizedImageUrl, createLandingPageUrl };
