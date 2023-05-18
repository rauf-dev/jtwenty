const express = require('express');
const { setCoverImage, resetCoverImage } = require('../utils/db/db-crud.js');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('in set cover image route');
    console.log(req.body);
    const albumId = req.body.albumId;
    const imageId = req.body.imageId;

    // reset all images in album to isCoverImage: false
    const resetCoverImageResult = await resetCoverImage(albumId);

    const setCoverImageResult = await setCoverImage(albumId, imageId);
    // console.log('setCoverImageResult', setCoverImageResult);
    res.send(setCoverImageResult);

    }
);

module.exports = router;