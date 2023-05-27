const express = require('express');
const router = express.Router();
const { getAllDbAlbums, getImagesInAlbum, getAlbumName } = require('../utils/db/db-crud.js');

// Image Gallery Page Route
router.get('/:albumName', async (req, res) => {
  console.log('In lightboxPageRoute.js');
  const albumName = req.params.albumName;
  // for the navbar albums list
  const allAlbums = await getAllDbAlbums();
  console.log('in image gallery page route');

console.log('albumName: ', albumName);

res.render('lightbox-page', { allAlbums, albumName });
});


module.exports = router;
