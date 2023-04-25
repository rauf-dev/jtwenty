// Signed upload using cloudinary widget

const express = require('express');
const { addNewImageToDbAlbum } = require('../utils/db/db-crud.js');
const cloudinaryConfig = require('../utils/cloudinary/cloudinaryConfig.js');
const cldMainFolder = require('../utils/cloudinary/cloudinaryMainFolder.js');
const getSignature = require('../utils/cloudinary/getSignature.js');

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

  // Create a thumbnail transformation url by modifying existing url, e.g.:
  // from https://res.cloudinary.com/jtwenty/image/upload/v1620000000/jtwentyAlbums/albumName/imageName.jpg
  // to https://res.cloudinary.com/jtwenty/image/upload/c_thumb/v1620000000/jtwentyAlbums/albumName/imageName.jpg
  const thumbnailUrl = req.body.url.replace('/upload/', '/upload/c_thumb/');

  //! To do: Figure out which image fields really need to be saved to DB
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
    thumbnail_url: thumbnailUrl,
    original_filename: req.body.original_filename,
    folder: req.body.folder,
  };

  // Find album in database and push image data to albumImages array
  const savedImageDataToDB = addNewImageToDbAlbum(albumName, image);
  console.log('Saved image data to DB');
  console.log(savedImageDataToDB);
  res.json({ success: true, folder: albumName });
});

module.exports = router;
