const express = require('express');
const router = express.Router();
const { deleteImageFromAlbum } = require('../utils/db/db-crud');

router.delete('/:albumId/:imageId', async (req, res) => {
  console.log('delete image route');

  const albumId = req.params.albumId;
  const imageId = req.params.imageId;

  //Delete image from album
  const deleteImage = await deleteImageFromAlbum(albumId, imageId);
  if (!deleteImage) {
    return res.status(400).json({ error: 'Ops something went wrong' });
  }
  console.log('deleteImage.deleteStatus: ', deleteImage.deleteStatus)
  res.json(deleteImage.deleteStatus);

});
 
module.exports = router;
