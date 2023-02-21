const express = require('express');
const router = express.Router();
const {saveNewDbAlbum} = require('../utils/db/db-crud.js');

router.post('/', async (req, res) => {
  //Save to db
  const savedAlbum = await saveNewDbAlbum(req.body);
  console.log(savedAlbum);
  res.json({ savedAlbum });
});

module.exports = router;
