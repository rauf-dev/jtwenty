const express = require('express');
const router = express.Router();
const {renameDbAlbumName} = require('../utils/db/db-crud.js');

router.post('/', async (req, res) => {
  //Save to db
  const renameAlbum = await renameDbAlbumName(req.body._id, req.body.newAlbumName);
  console.log(renameAlbum);
  res.json({ renameAlbum });
});

module.exports = router;