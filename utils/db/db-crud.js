const mongoose = require('mongoose');
const Album = require('../../models/albumSchema.js');

//##############################################################################
/**
 * @description Save new album to db
 * @param {*} data which will be the album name to save to db
 * @returns {Object} Saved album object
 */
async function saveNewDbAlbum(data) {
  console.log('in saveNewDbAlbum');
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
  console.log('in getAllDbAlbums');
  try {
    const albumsPathCount = await Album.aggregate([
      { $project: { albumName: 1, albumPath: 1, albumImages: 1, createdAt: 1 } },
      { $addFields: { count: { $size: { $ifNull: ['$albumImages', []] } } } },
      { $project: { albumName: 1, albumPath: 1, count: 1, createdAt: 1 } },
    ]);

    // const albumsPathCount = await Album.aggregate([
    //   { $project: { albumName: 1, albumPath: 1, albumImages: 1, createdAt: 1 } }, // projects only albumName, albumPath and albumImages
    //   { $addFields: { imageCount: { $size: { $ifNull: ['$albumImages', []] } } } }, // add a new field 'imageCount' to the document and set it to the size of the 'albumImages' array or 0 if it's null
    //   { $unwind: { path: '$albumImages', preserveNullAndEmptyArrays: true } }, // unwinds the array, preserving null and empty arrays
    //   { $group: { _id: '$_id', albumName: { $first: '$albumName' }, albumPath: { $first: '$albumPath' }, count: { $sum: '$imageCount' } } }, // grouping
    //   { $project: { _id: '$_id', albumName: 1, count: 1, albumPath: 1, createdAt: 1 } }, // projects only _id, albumName, albumPath and count
    // ]);
    return albumsPathCount;
  } catch (error) {
    return error.message;
  }
}
//##############################################################################
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
  console.log('in deleteDbAlbum');
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

// rename album name
async function renameDbAlbumName(albumId, newAlbumName) {
  console.log('in renameDbAlbumName');
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
async function addNewImageToDbAlbum(albumName, newImageData) {
  console.log('###############################################');
  console.log('in addNewImageToDbAlbum');
  console.log('newImageData');
  console.log(newImageData);
  console.log('###############################################');
  try {
    const savedImages = await Album.findOneAndUpdate({ albumName: albumName }, { $push: { albumImages: newImageData } }, { new: true, upsert: true });
    return savedImages;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
//##############################################################################

async function getImagesInAlbum(albumId) {
  try {
    console.log('in getImagesInAlbum function');
    const album = await Album.findById(albumId);

    // returning the full album object as will need the album_id to delete images
    return album;
  } catch (error) {
    console.log('catch: error in getImagesInAlbum function');
    console.log(error);
  }
}
//##############################################################################

async function deleteImageFromAlbum(albumId, imageId) {
  console.log('in deleteImageFromAlbum');
  try {
    let deleteStatus = 'failed';
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
    deleteStatus = 'success';

    return { deleteImage, deleteStatus };
  } catch (error) {
    console.log(error);
    console.log(error.message);
    let deleteSuccess = false;
    return error.message, deleteSuccess;
  }
}

//##############################################################################

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
//##############################################################################
// function named defaultSetCoverImage
//loop images in each album and set the cover image
// define empty object named coverAlbums
// if album has no images, set coverImage url to "public/assets/no-image-available.jpg", add url and albumName, albumId to coverAlbums.
// if album has images, check if any image has isCoverImage: true, return that image url as coverImage url, add url and albumName, albumId to coverAlbums.
// if no image has isCoverImage: true, return the first image url as coverImage url, add url and albumName, albumId to coverAlbums.

async function defaultSetCoverImage(allAlbums) {
  console.log('in defaultSetCoverImage');
  try {
    const coverAlbums = [];
    console.log(allAlbums.length);
    for (let i = 0; i < allAlbums.length; i++) {
      const album = allAlbums[i];

      // get array of images in album
      const albumImages = await getImagesInAlbum(album._id);
      console.log('albumImages', albumImages);

      if (albumImages.albumImages.length === 0) {
        console.log('album has no images');
        const coverImage = {
          coverImageUrl: '/assets/no-image-available.jpg',
          albumName: album.albumName,
          albumId: album._id,
          count: allAlbums[i].count,
        };
        coverAlbums.push(coverImage);
      } else {
        console.log('album has images');
        const foundCoverImage = await albumImages.albumImages.find((image) => image.isCoverImage === true);

        if (foundCoverImage) {
          console.log('album has cover image');
          const coverImage = {
            coverImageUrl: foundCoverImage.landingPage_url,
            albumName: album.albumName,
            albumId: album._id,
            count: allAlbums[i].count,
          };
          coverAlbums.push(coverImage);
        } else {
          console.log('album has no cover image');
          const coverImage = {
            coverImageUrl: albumImages.albumImages[0].landingPage_url,
            albumName: album.albumName,
            albumId: album._id,
            count: allAlbums[i].count,
          };
          coverAlbums.push(coverImage);
          // save coverImage to db
          await userSetCoverImage(album._id, albumImages.albumImages[0].public_id);
        }
      }
    }
    return coverAlbums;
  } catch (error) {
    console.log('catching error in defaultSetCoverImage');
    console.log(error);
    return error.message;
  }
}

//##############################################################################

//function that takes in album name, album id and image id and finds in db the image and writes the image "isCoverImage: Boolean," to true
// and writes the rest of the images in the album to false.
// This function is triggered in two places
// 1. FE when user manually sets a cover image for an album.
// 2. BE when user creates a new album and the first image in the album is set as the cover image.

async function userSetCoverImage(albumId, imagePublicId) {
  console.log('in DB CRUDS setCoverImage');
  try {
    const album = await Album.findById(albumId);
    if (!album) {
      throw new Error(`Album with ID ${albumId} not found`);
    }
    const image = album.albumImages.find((image) => image.public_id === imagePublicId);
    if (!image) {
      throw new Error(`Image with Public ID ${imagePublicId} not found in album with ID ${albumId}`);
    }
    console.log('album and image found');
    // Find album in db, inside album find the image "imagePublicId" and write isCoverImage: true
    const setCoverImage = await Album.findOneAndUpdate(
      { _id: albumId, 'albumImages.public_id': imagePublicId },
      { $set: { 'albumImages.$.isCoverImage': true } },
      { new: true }
    );
    console.log(`setCoverImage result is ${setCoverImage}`);
    return setCoverImage;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.message;
  }
}

//##############################################################################

module.exports = {
  saveNewDbAlbum,
  getAllDbAlbums,
  deleteDbAlbum,
  checkIfDbAlbumNameExists,
  renameDbAlbumName,
  addNewImageToDbAlbum,
  getImagesInAlbum,
  deleteImageFromAlbum,
  getAlbumName,
  defaultSetCoverImage,
  userSetCoverImage,
};
