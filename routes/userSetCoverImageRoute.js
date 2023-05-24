const express = require('express');
const { userSetCoverImage, resetCoverImage } = require('../utils/db/db-crud.js');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('in set cover image route');
  console.log(req.body);
  const albumId = req.body.albumId;
  const imageId = req.body.imageId;
  const imagePublicId = req.body.imagePublicId;

  // reset all images in album to isCoverImage: false
  const resetCoverImageResult = await resetCoverImage(albumId);
  console.log('resetCoverImageResult', resetCoverImageResult);

  /*
   example success result: 
   resetCoverImageResult {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
  */

  // if reset success, set image to isCoverImage: true
  if (resetCoverImageResult.modifiedCount === 1) {
    const setCoverImageResult = await userSetCoverImage(albumId, imagePublicId);
    console.log('setCoverImageResult', setCoverImageResult);
    /* 
    setCoverImageResult returns the full document of the image that was updated;
    albumId, albumName, albumPath, albumImages[public_id, url, secure-masonry-landingPage_url, isCoverImage]
    */
    res.send({setCoverImageResult: 'success'});
  } else {
    res.send({ statusSetCoverImage: 'error' });
  }

  // console.log('setCoverImageResult', setCoverImageResult);
});

module.exports = router;
