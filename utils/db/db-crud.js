const Album = require('../../models/albumSchema.js');

async function saveNewDbAlbum(data) {
  try {
    const newAlbum = new Album(data);
    await newAlbum.save();
    return newAlbum;
  } catch (error) {
    return error.message;
  }
}

async function getAllDbAlbums() {
  try {
    //! Refine with filter for only albumname & path
    const allAlbums = await Album.find();
    return allAlbums;
  } catch (error) {
    return error.message;
  }
}

async function deleteDbAlbum(data) {
  try {
    const deletedAlbum = await Album.deleteOne({ _id: data });
    return deletedAlbum;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function checkIfDbAlbumNameExists(data) {
  try {
    const exists = await Album.exists(data);
    console.log(exists);
    return exists;
  } catch (error) {
    return error.message;
  }
}

// Test rename album name
async function renameDbAlbumName(albumId, newAlbumName) {
  try {
    const renamed = await Album.updateOne({ _id: albumId }, { albumName: newAlbumName });
    return renamed;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

// Insert new Image to db
// Send as content-type application/json, body --> raw (JSON). See data example below
async function addNewImageToDbAlbum(albumId, newImageData) {
  try {
    const savedImages = await Album.findOneAndUpdate({ _id: albumId }, { $push: { albumImages: newImageData } }, { new: true, upsert: true });
    return savedImages;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

module.exports = {
  saveNewDbAlbum,
  getAllDbAlbums,
  deleteDbAlbum,
  checkIfDbAlbumNameExists,
  renameDbAlbumName,
  addNewImageToDbAlbum,
};

// EXAMPLE DATA FOR addNewImageToDbAlbum
// {
//   "albumId": "63f51bba79472ee95b4472a9",
//   "newImageData": [
//     {
//       "asset_id": "502b5ad0f5d0ff045b2aba39fe84978b",
//       "public_id": "albums/1003/mlts9we78gqc1afl2jqc",
//       "url": "http://res.cloudinary.com/dzcyxehoa/image/upload/v1674244168/albums/1003/mlts9we78gqc1afl2jqc.jpg",
//       "secure_url": "https://res.cloudinary.com/dzcyxehoa/image/upload/v1674244168/albums/1003/mlts9we78gqc1afl2jqc.jpg"
//     },
//     {
//       "asset_id": "502b5ad0f5d0ff045b2aba39fe849701",
//       "public_id": "albums/1003/mlts9we78gqc1afl2j01",
//       "url": "http://res.cloudinary.com/dzcyxehoa/image/upload/v1674244168/albums/1003/mlts9we78gqc1afl2j01.jpg",
//       "secure_url": "https://res.cloudinary.com/dzcyxehoa/image/upload/v1674244168/albums/1003/mlts9we78gqc1afl2j01.jpg"
//     }
//   ]
// }
