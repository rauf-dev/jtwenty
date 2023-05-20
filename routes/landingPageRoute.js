const express = require('express');
const router = express.Router();
const { getAllDbAlbums, defaultSetCoverImage } = require('../utils/db/db-crud.js');

router.get('/', async (req, res) => {
  // for the navbar albums list
  const allAlbums = await getAllDbAlbums();
  console.log('allAlbums', allAlbums);

  // loop images in each album and set the cover image
  // define empty object named coverAlbums
  // if album has no images, set coverImage url to "public/assets/no-image-available.jpg", add url and albumName, albumId to coverAlbums.
  // if album has images, check if any image has isCoverImage: true, return that image url as coverImage url, add url and albumName, albumId to coverAlbums.
  // if no image has isCoverImage: true, return the first image url as coverImage url, add url and albumName, albumId to coverAlbums.

  const coverAlbums = await defaultSetCoverImage(allAlbums);
  console.log('coverAlbums', coverAlbums)

  // define albumName for landing page so it can be excluded from being shown.
  // this is a hacky way to do it, but it works for now.
  const albumName = 'home';
  res.render('landing-page', { allAlbums, albumName, coverAlbums });
});

module.exports = router;
