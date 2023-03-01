const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

  albumImages: [
    {
      asset_id: String,
      public_id: String,
      url: String,
      secure_url: String,
    },
  ],
});

AlbumSchema.virtual('allImages').get(function () {
  return this.albumImages.map((image) => {
    return{
      asset_id: image.asset_id,
      public_id: image.public_id,
      url: image.url,
      secure_url: image.secure_url,
      _id: image._id
    } 
  });
});

AlbumSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Album', AlbumSchema);

