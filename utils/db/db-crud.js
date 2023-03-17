const mongoose = require('mongoose');
const Album = require('../../models/albumSchema.js');

//##############################################################################
/**
 * @description Save new album to db
 * @param {*} data which will be the album name to save to db
 * @returns {Object} Saved album object
 */
async function saveNewDbAlbum(data) {
  try {
    const newAlbum = new Album(data);
    await newAlbum.save();
    return newAlbum;
  } catch (error) {
    return error.message;
  }
}

//Example of success response:
/**{
    "savedAlbum": {
        "albumName": "auckland",
        "albumPath": "albums/auckland",
        "_id": "63f74d9fadb3953a36776abe",
        "albumImages": [],
        "__v": 0
    }
}
**/

//##############################################################################
/**
 * @description Get all albums from db. Data is used in Navbar to build links to albums and show count of images per album
 * @returns {Array} Array of objects with _id, albumName, albumPath and count of images per album
 */
async function getAllDbAlbums() {
  try {
    const albumsPathCount = await Album.aggregate([
      { $project: { albumName: 1, albumPath: 1, albumImages: 1, createdAt: 1 } }, // projects only albumName, albumPath and albumImages
      { $addFields: { imageCount: { $size: { $ifNull: ['$albumImages', []] } } } }, // add a new field 'imageCount' to the document and set it to the size of the 'albumImages' array or 0 if it's null
      { $unwind: { path: '$albumImages', preserveNullAndEmptyArrays: true } }, // unwinds the array, preserving null and empty arrays
      { $group: { _id: '$_id', albumName: { $first: '$albumName' }, albumPath: { $first: '$albumPath' }, count: { $sum: '$imageCount' } } }, // grouping
      { $project: { _id: '$_id', albumName: 1, count: 1, albumPath: 1, createdAt: 1 } }, // projects only _id, albumName, albumPath and count
    ]);
    return albumsPathCount;
  } catch (error) {
    return error.message;
  }
}
// Example Success Response:
/**
 {
    "allAlbums": [
        {
            "_id": "63f5aec632b925d379662599",
            "albumName": "zeeland",
            "albumPath": "albums/zeeland",
            "count": 2
        },
        {
            "_id": "63f51bba79472ee95b4472a9",
            "albumName": "not chatanooga",
            "albumPath": "albums/chatanooga",
            "count": 4
        }
    ]
}
 */
//##############################################################################
/**
 * @description Delete album from db
 * @param {*} data id of album to delete
 * @returns
 */
async function deleteDbAlbum(data) {
  try {
    const deletedAlbum = await Album.deleteOne({ _id: data });
    return deletedAlbum;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
/**
 * Example of success response:
 * {
    "deletedAlbum": {
        "acknowledged": true,
        "deletedCount": 1 // 1 if deleted, 0 if not found
    }
}
  */
//##############################################################################
/**
 * @description Check if albumName already exists in db
 * @param {*} data album name to check
 * @returns {Object} _id of album if exists, otherwise null
 */

async function checkIfDbAlbumNameExists(data) {
  console.log('in checkIfDbAlbumNameExists');
  console.log(data);
  try {
    const albumNameExistsInDB = await Album.exists({ albumName: data });
    console.log('albumNameExistsInDB', albumNameExistsInDB);
    return albumNameExistsInDB; 
  } catch (error) {
    console.log('catching error in checkIfDbAlbumNameExists');
    return error.message;
  }
}
//##############################################################################

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
//##############################################################################

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
//##############################################################################

// async function getImagesInAlbum(albumId) {
//   console.log('albumId', albumId);
//   const album = await Album.findById(albumId);
//   console.log(album);
//   // const album = await Album.findById(albumId).populate('images');
//   const images = album.allImages;
//   return images;
// }
//##############################################################################

async function deleteImageFromAlbum(albumId, imageId) {
  try {
    let deleteSuccess = false;
    // Check if album and image exist
    const album = await Album.findById(albumId);
    if (!album) {
      throw new Error(`Album with ID ${albumId} not found`);
    }
    const image = album.albumImages.find((image) => image._id.toString() === imageId);
    if (!image) {
      throw new Error(`Image with ID ${imageId} not found in album with ID ${albumId}`);
    }
    console.log('album and image found');

    // Delete image from album
    const deleteImage = await Album.findByIdAndUpdate(albumId, { $pull: { albumImages: { _id: imageId } } }, { new: true });
    console.log(`delImage result is ${deleteImage}`);
    deleteSuccess = true;

    return { deleteImage, deleteSuccess };
  } catch (error) {
    console.log(error);
    console.log(error.message);
    let deleteSuccess = false;
    return error.message, deleteSuccess;
  }
}

// async function deleteImageFromAlbum(albumId, imageId) {
//   try {
//     const album = await Album.findByIdAndUpdate(albumId, { $pull: { albumImages: { _id: imageId } } });
//     if (!album) { // !album is true if album is null or undefined
//       throw new Error(`Album with ID ${albumId} not found`);
//     }
//     const image = album.albumImages.find((image) => image._id.toString() === imageId);
//     if (!image) {
//       throw new Error(`Image with ID ${imageId} not found in album with ID ${albumId}`);
//     }
//     console.log(`Image with ID ${imageId} deleted from album with ID ${albumId}`);
//     return album;
//   } catch (error) {
//     console.log(`Error deleting image from album: ${error}`);
//     return error.message;
//   }
// }

async function getAlbumName(data) {
  console.log('in getAlbumName');
  console.log(data);
  try {
    const albumName = await Album.findById(data);
    console.log('albumName', albumName);
    return albumName.albumName; 
  } catch (error) {
    console.log('catching error in getAlbumName');
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
  // getImagesInAlbum,
  deleteImageFromAlbum,
  getAlbumName
};
