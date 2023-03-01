const express = require('express');
const router = express.Router();
const { deleteImageFromAlbum } = require('../utils/db/db-crud')

router.post('/', async (req, res) => {
    // Which album? req.body.albumId
    // Which image? req.body.imageId

    const albumId = req.body.albumId;
    const imageId = req.body.imageId;

    //Delete image from album
    const deleteImage = await deleteImageFromAlbum(albumId, imageId);
    if (!deleteImage) {
        return res.status(400).json({ error: 'Ops something went wrong' });
    }
    res.json({ deleteImage });

//   //Get all albumImages per album
//   console.log(req.params.id);
//   const albumImages = await getImagesInAlbum(req.params.id);
//   res.json({ albumImages });
});

module.exports = router;