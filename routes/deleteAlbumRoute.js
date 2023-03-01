const express = require('express');
const router = express.Router();
const { deleteDbAlbum } = require('../utils/db/db-crud.js');
const mongoose = require('mongoose');


router.post('/:id', async (req, res) => {
  //Validate if id is valid mongoose ObjectId
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id); 

  if (!isValidObjectId) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }
  //Delete from db
  const deletedAlbum = await deleteDbAlbum(req.params.id);
  res.json({ deletedAlbum });
});

module.exports = router;
