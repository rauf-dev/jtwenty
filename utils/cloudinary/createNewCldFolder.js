const cldMainFolder = require('./cloudinaryMainFolder');
const cloudinary = require('cloudinary').v2;
// const cloudinaryConfig = require('./cloudinaryConfig');

const createNewCldFolder = async (newAlbumName) => {
  console.log('in createNewCldFolder');
  try {
    const response = await cloudinary.api.create_folder(
      cldMainFolder + newAlbumName
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = createNewCldFolder;