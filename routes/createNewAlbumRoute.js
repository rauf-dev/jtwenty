const express = require('express');
const router = express.Router();
const { saveNewDbAlbum, checkIfDbAlbumNameExists } = require('../utils/db/db-crud.js');

router.get('/', (req, res) => {
  res.render('new-album-page', { title: 'Create New Album' });
});

router.post('/', async (req, res) => {
  //validate req.body is already done in middleware

  //Check if album name is already in use
  const albumNameExists = await checkIfDbAlbumNameExists(req.body.albumName); // returns _id of album if exists, otherwise null

  //below is called the nullish coalescing operator (??) which is a new feature in ES2020
  //same as: if (albumNameExists !== null && albumNameExists !== undefined)
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  if (albumNameExists ?? false) {
    return res.status(400).json({ error: 'Album name already in use' });
  }

  //Save to db
  const savedAlbum = await saveNewDbAlbum(req.body);
  console.log(savedAlbum);
  res.json({ savedAlbum });
});

module.exports = router;
