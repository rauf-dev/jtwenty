// LANDING PAGE
// DATA:    - All Folder Names from DB
//          - Count of images per folder
const express = require('express');
const router = express.Router();
const {getAllDbAlbums}= require('../utils/db/db-crud.js');

router.get('/', async (req, res) => {
  const allAlbums = await getAllDbAlbums()
  res.json({ allAlbums });
});

module.exports = router;
