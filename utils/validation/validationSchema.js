const yup = require('yup');
const mongoose = require('mongoose');

const valNewAlbumSchema = yup.object().shape({
  albumName: yup.string().required().min(1).max(25),
  albumPath: yup.string().required().min(1).max(25),
});

const valDeleteAlbumSchema = yup.object().shape({
  _id: yup.string().test('valid-object-id', 'Invalid ObjectId', (value) => {
    return mongoose.Types.ObjectId.isValid(value);
  }),
});

const valRenameAlbumSchema = yup.object().shape({
  _id: yup.string().test('valid-object-id', 'Invalid ObjectId', (value) => {
    return mongoose.Types.ObjectId.isValid(value);
  }),
  newAlbumName: yup.string().required().min(1).max(25),
});

module.exports = { valNewAlbumSchema, valDeleteAlbumSchema, valRenameAlbumSchema };
