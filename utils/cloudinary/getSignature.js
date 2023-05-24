const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../../utils/cloudinary/cloudinaryConfig.js');

async function getSignature(widgetOrForm, uploadDestinationFolder, timestamp) {
  try {
    if (widgetOrForm === 'widget') {
      console.log('returning widget signature');
      const albumNameForTag = uploadDestinationFolder.split('/')[1];
      return cloudinary.v2.utils.api_sign_request(
        {
          timestamp: timestamp,
          source: 'uw',
          folder: uploadDestinationFolder,
          tags: [albumNameForTag, "jtwentyAlbums"]
        },
        cloudinaryConfig.api_secret
      );
    }
    if (widgetOrForm === 'form') {
      console.log('returning form signature');
      return cloudinary.v2.utils.api_sign_request(
        {
          timestamp: timestamp,
          folder: uploadDestinationFolder,
        },
        cloudinaryConfig.api_secret
      );
    }
    console.log('widget or form argument not provided');
  } catch (error) {
    console.log('CATCH ERROR IN FUNCTION GET SIGNATURE');
    console.log(error);
  }
}

module.exports = getSignature;
