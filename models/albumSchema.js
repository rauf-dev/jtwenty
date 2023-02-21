const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const albumImagesSchema = new Schema({
//   albumImages: [
//     {
//       asset_id: String,
//       public_id: String,
//       url: String,
//       secure_url: String,
//     },
//   ],
// });

const AlbumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
    lowercase: true,
  },
  albumPath: {
    type: String,
    required: true,
    lowercase: true,
  },
  // albumImages: [albumImagesSchema],
  albumImages: [
    {
      asset_id: String,
      public_id: String,
      url: String,
      secure_url: String,
    }
  ]
});

module.exports = mongoose.model('album', AlbumSchema);
