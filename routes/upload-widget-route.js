// Signed upload using cloudinary widget

const express = require('express');
const cloudinaryConfig = require('../utils/cloudinary/cloudinaryConfig.js');
const cldMainFolder = require('../utils/cloudinary/cloudinaryMainFolder.js');
const getSignature = require('../utils/cloudinary/getSignature.js');

const router = express.Router();

// show signed upload page with upload WIDGET
// router.get('/upload-widget/:albumName', async (req, res) => {
//   const albumName = req.params.albumName;
//   console.log('reading json file');
//   const jsonFileData = await readJsonFile(); //reads json file
//   const dataToSend = {
//     customMessage: 'Upload Widget Page',
//     navData: jsonFileData,
//     albumName: albumName,
//   };
//   res.render('uploadWidgetPage', { dataToSend });
// });

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

module.exports = router;
