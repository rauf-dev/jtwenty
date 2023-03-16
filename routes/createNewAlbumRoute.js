const express = require('express');
const router = express.Router();
const { saveNewDbAlbum, checkIfDbAlbumNameExists } = require('../utils/db/db-crud.js');
const createNewCldFolder = require('../utils/cloudinary/createNewCldFolder.js');

router.get('/', (req, res) => {
  res.render('new-album-page', { title: 'Create New Album' });
});

router.post('/', async (req, res) => {
  //validate req.body is already done in middleware
  console.log('in createNewAlbumRoute.js');
  console.log(req.body);
  //Check if album name is already in use
  const albumNameExists = await checkIfDbAlbumNameExists(req.body.albumName); // returns _id of album if exists, otherwise null
  console.log('checkIfDbAlbumNameExists done: ', albumNameExists);
  //below is called the nullish coalescing operator (??) which is a new feature in ES2020
  //same as: if (albumNameExists !== null && albumNameExists !== undefined)
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  if (albumNameExists ?? false) {
    return res.json({ error: 'Album name already in use' });
    // return res.status(400).json({ error: 'Album name already in use' });
  }

  // Create a folder in cloudinary
  const cldFolderResponse = await createNewCldFolder(req.body.albumName);
  console.log('createNewCldFolder done: ', cldFolderResponse);
  console.log(cldFolderResponse);
  if (cldFolderResponse.error) {
    return res.json({ error: cldFolderResponse.error });
  } 
  
  //Save to db using response from cloudinary
  const savedAlbum = await saveNewDbAlbum({albumName:cldFolderResponse.name, albumPath:cldFolderResponse.path});
  console.log('saveNewDbAlbum done: ', savedAlbum);
  console.log('savedAlbum: ', savedAlbum);
  res.json({ savedAlbum }); // change to render view album page
});

module.exports = router;
