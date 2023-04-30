const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary');
const cloudinaryConfig = require('./cloudinaryConfig.js');

// function named runOnceCreateNamedTransformations that creates a named transformation called thumbnail
// This function is called in server.js
const runOnceCreateNamedTransformations = async function () {
  try {
    // enter the name and settings of the named transformation you want to create
    const transformationName = 'jtwentyMosaic_v2';
    const transformationSettings = {
      aspect_ratio: '4:3',
      crop: 'fill',
      width: '500',
      crop: 'scale',
      dpr: 'auto',
    };

    // if (transformationName !== '' && transformationName !== 'jtwentyThumbnail') {
      // init cloudinary
      cloudinaryConfig;

      // get list of existing named transformations
      const namedTransformations = await cloudinary.api.transformations(true);
      console.log('namedTransformations');
      console.log(namedTransformations);

      // iterate to check if named transformation already exists
      const namedTransformationExists = namedTransformations.transformations.find(
        // returns the transformation object if it exists or undefined if it doesnt
        (transformation) => transformation.name === 't_' + transformationName
      );
      console.log(namedTransformationExists);

      // if doesnt exist, create the new named transformation
      if (!namedTransformationExists) {
        const result = await cloudinary.api.create_transformation(transformationName, transformationSettings);
        console.log(`transformation "${transformationName}" created`);
        console.log(result);
      } else {
        console.log(`transformation "${transformationName}" already exists`);
        return
      }

  } catch (error) {
    console.log(error);
  }
};

module.exports = runOnceCreateNamedTransformations;
