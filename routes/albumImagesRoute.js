const express = require('express');
const router = express.Router();
const getImagesInAlbum = require('../utils/db/db-crud').getImagesInAlbum;

router.get('/:id', async (req, res) => {
  //Get all albumImages per album
  console.log(req.params.id);
  const albumImages = await getImagesInAlbum(req.params.id);
  res.json({ albumImages });
});

module.exports = router;
