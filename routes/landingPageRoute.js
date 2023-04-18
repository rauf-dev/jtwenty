const express = require('express');
const router = express.Router();
const { getAllDbAlbums } = require('../utils/db/db-crud.js');

router.get('/', async (req, res) => {
  // for the navbar albums list
  const allAlbums = await getAllDbAlbums();
console.log('allAlbums', allAlbums)
  // define albumName for landing page so it can be excluded from being shown.
  // this is a hacky way to do it, but it works for now.
  const albumName = 'home';
  res.render('landing-page', { allAlbums, albumName });
});

module.exports = router;
