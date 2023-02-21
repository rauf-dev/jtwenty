const express = require('express');
const router = express.Router();
const {deleteDbAlbum} = require('../utils/db/db-crud.js');

router.post('/:id', async (req, res) => {
  //Delete from db
  const deletedAlbum = await deleteDbAlbum(req.params.id);
  res.json({ deletedAlbum });
});

module.exports = router; 