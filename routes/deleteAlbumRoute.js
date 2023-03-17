const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { deleteDbAlbum, getAlbumName } = require('../utils/db/db-crud.js');
const { deleteEmptyFolder, deleteResourcesInFolder } = require('../utils/cloudinary/deleteFolder.js');

router.delete('/:id', async (req, res) => {
  console.log('in deleteAlbumRoute.js');
  //Validate if id is valid mongoose ObjectId
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    console.log(`Invalid ObjectId: ${req.params.id}`);
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  // Find album name from mongo db using mongoose
  const albumName = await getAlbumName(req.params.id);
  console.log(albumName);

  // Delete folder "albumName" from Cloudinary
  const deleteCLD = await deleteEmptyFolder(albumName);
  console.log(deleteCLD);

  // If folder not empty, delete all resources in folder
  // If the response is an error
  if (deleteCLD.error) {
    console.log(deleteCLD.error);

    // If the response is an error because folder not empty
    if (deleteCLD.error.http_code === 400 && deleteCLD.error.message === 'Folder is not empty') {
      console.log(`FOLDER ${albumName} IS NOT EMPTY, START DELETE ALL RESOURCES INSIDE FOLDER`);
      await deleteResourcesInFolder(albumName);
      console.log(`RESOURCES INSIDE ${albumName} DELETED, NOW DELETING FOLDER`);
      responseData = await deleteEmptyFolder(albumName);
      console.log(`FOLDER ${albumName} DELETED`);
    }else {
      console.log('ERROR IN DELETE FOLDER');
    }
  }


  //Delete from db
  console.log(`Deleting album with id: ${req.params.id}`);
  const deletedAlbum = await deleteDbAlbum(req.params.id);
  console.log(`Deleted album with id: ${req.params.id}`);
  console.log(deletedAlbum);
  console.log(deletedAlbum.deletedCount);
  if (deletedAlbum.deletedCount === 0) {
    console.log(deletedAlbum);
    return res.status(404).json({ error: deletedAlbum });
  }

  //Send response
  res.status(200).json({ success: deletedAlbum });
});

module.exports = router;
