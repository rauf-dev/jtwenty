const express = require('express');
const router = express.Router();
const { saveNewDbAlbum, checkIfDbAlbumNameExists } = require('../utils/db/db-crud.js');
const { getAllDbAlbums } = require('../utils/db/db-crud.js');

router.get('/', async (req, res) => {
  const allAlbums = await getAllDbAlbums();
  res.render('new-album-page', { allAlbums });
});

module.exports = router;
