const express = require('express');
const router = express.Router();
const {addNewImageToDbAlbum} = require('../utils/db/db-crud.js');

router.post('/', async (req, res) => {
  //Save to db
  console.log(req.body)
  const imageAdded = await addNewImageToDbAlbum(req.body.albumId, req.body.newImageData);
  res.json({ imageAdded });
});

module.exports = router;