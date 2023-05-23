const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary');
const cloudinaryConfig = require('./cloudinaryConfig.js');

// function named runOnceCreateNamedTransformations that creates a named transformation called thumbnail
// This function is called in server.js
const runOnceCreateNamedTransformations = async function () {
  try {
    // enter the name and settings of the named transformation you want to create
    // const transformationName = 'albumCoverImageTransformation';
    // const transformationSettings = {
    //   crop: 'thumb',
    //   gravity: 'faces',
    //   width: 200,
    //   height: 200,
    //   quality: 'auto',
    //   fetch_format: 'auto',
    //   color: '#FFFFFF',
    //   overlay: { font_family: 'helvetica', font_size: 120, font_weight: 'bold', text_align: 'left', text: 'Hello' },
    //   flags: 'layer_apply',
    // };

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
    // console.log('namedTransformations');
    // console.log(namedTransformations);

    // iterate to check if named transformation already exists
    const namedTransformationExists = namedTransformations.transformations.find(
      // returns the transformation object if it exists or undefined if it doesnt
      (transformation) => transformation.name === 't_' + transformationName
    );
    // console.log(namedTransformationExists);

    // if doesnt exist, create the new named transformation
    if (!namedTransformationExists) {
      const result = await cloudinary.api.create_transformation(transformationName, transformationSettings);
      console.log(`transformation "${transformationName}" created`);
      console.log(result);
    } else {
      console.log(`transformation "${transformationName}" already exists`);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = runOnceCreateNamedTransformations;
