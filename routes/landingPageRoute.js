const express = require('express');
const router = express.Router();
const { getAllDbAlbums } = require('../utils/db/db-crud.js');

router.get('/', async (req, res) => {
  const allAlbums = await getAllDbAlbums();
  // res.json({ allAlbums });
  res.render('landing-page', { allAlbums });
});

module.exports = router;
