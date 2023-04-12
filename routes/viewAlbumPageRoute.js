const express = require('express');
const router = express.Router();
const { getAllDbAlbums, getImagesInAlbum, getAlbumName } = require('../utils/db/db-crud.js');

router.get('/:albumId', async (req, res) => {
  // for the navbar albums list
  const allAlbums = await getAllDbAlbums();
  console.log('in view album page route');

  // get albumname for page title
  const albumName = await getAlbumName(req.params.albumId);

  // add functionality to get all images in album from database
  console.log('req.params.albumId: ', req.params.albumId);
  const albumImages = await getImagesInAlbum(req.params.albumId);
  // console.log('albumImages: ', albumImages);

  res.render('view-album-page', { allAlbums, albumImages, albumName });
});

module.exports = router;
