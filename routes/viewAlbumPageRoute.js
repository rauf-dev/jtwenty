const express = require('express');
const router = express.Router();
const { getAllDbAlbums } = require('../utils/db/db-crud.js');

router.get('/:albumname', async (req, res) => {
  // for the navbar
  const allAlbums = await getAllDbAlbums(); 
  console.log('in view album page route');

  // add functionality to get all images in album from database
  // const albumImages = await getImagesInAlbum(req.params.id); 



  res.render('view-album-page', { allAlbums } );
});

module.exports = router;
