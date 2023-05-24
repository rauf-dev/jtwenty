// Signed upload using cloudinary widget

const express = require('express');
const { addNewImageToDbAlbum, defaultSetCoverImage } = require('../utils/db/db-crud.js');
const cloudinaryConfig = require('../utils/cloudinary/cloudinaryConfig.js');
const cldMainFolder = require('../utils/cloudinary/cloudinaryMainFolder.js');
const getSignature = require('../utils/cloudinary/getSignature.js');
const { createOptimizedImageUrl, createLandingPageUrl } = require('../utils/cloudinary/optimizeImage.js');

const router = express.Router();

// Return signature for upload widget
router.post('/get-signature-widget', async (req, res) => {
  console.log('IN ROUTE GET-SIGNATURE-WIDGET');
  const uploadDestinationFolder = `${cldMainFolder}${req.body.uploadToFolder}`;
  const timestamp = Math.round(new Date().getTime() / 1000);

  console.log('Calling function getSignature');
  const signature = await getSignature('widget', uploadDestinationFolder, timestamp);

  console.log('Got signature, passing back to front end');
  res.json({
    signature: signature,
    timestamp: timestamp,
    folder: uploadDestinationFolder,
    cloudname: cloudinaryConfig.cloud_name,
    apikey: cloudinaryConfig.api_key,
  });
});

router.post('/save-image-data', async (req, res) => {
  console.log('IN ROUTE SAVE-IMAGE-DATA');
  console.log(req.body);

  // Save image data to database using mongoose, save to albumImages array
  const albumName = req.body.folder;

  // Below can be achieved by using the cloudinary widget upload preset
  // Create url with thumbnail transformation and quality auto, delivery format auto
  // from https://res.cloudinary.com/cloudname/image/upload/albumName/imageName.jpg
  // to https://res.cloudinary.com/cloudname/image/upload/t_jtwentyThumbnail/f_auto/q_auto/albumName/imageName
  // note that the image format is removed from the url
  // const thumbnailUrlWithQuality = req.body.url.replace('/upload/', '/upload/t_jtwentyThumbnail/f_auto/q_auto/');

  const masonryUrl = await createOptimizedImageUrl(req.body.public_id, 'jtwentyMosaic_v2');
  console.log('masonryUrl', masonryUrl);

  const landingPageUrl = await createLandingPageUrl(req.body.public_id, albumName);

  const image = {
    public_id: req.body.public_id,
    format: req.body.format,
    width: req.body.width,
    height: req.body.height,
    bytes: req.body.bytes,
    resource_type: req.body.resource_type,
    created_at: req.body.created_at,
    tags: req.body.tags,
    url: req.body.url,
    secure_url: req.body.secure_url,
    masonry_url: masonryUrl,
    landingPage_url: landingPageUrl,
    // thumbnail_url: thumbnailUrlWithQuality,
    // fullSizeUrl: fullSizeUrlWithQuality,
    original_filename: req.body.original_filename,
    folder: req.body.folder,
    isCoverImage: false,
  };

  // Find album in database and push image data to albumImages array
  const savedImageDataToDB = await addNewImageToDbAlbum(albumName, image); //await added 19.05.2023, any reason was excluded?

  // run function to findOrSetCoverImage(albumName)
  const setCoverImageResult = await defaultSetCoverImage(albumName);

  console.log('Saved image data to DB');
  console.log(savedImageDataToDB);
  res.json({ success: true, folder: albumName });
});

module.exports = router;
