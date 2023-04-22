const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Init Cloudinary ################################
dotenv.config();
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// function named runOnceCreateNamedTransformations that creates a named transformation called thumbnail
// This function is called in server.js
const runOnceCreateNamedTransformations = async function () {
  try {
    // enter the name and settings of the named transformation you want to create
    const transformationName = '';
    const transformationSettings = {};

    if (transformationName !== '') {
      // get list of existing named transformations
      const namedTransformations = await cloudinary.api.transformations(true);
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
      }
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cloudinaryConfig, runOnceCreateNamedTransformations };

// const transformationName = 'jtwentyThumbnailz';
// const transformationSettings = {
//   crop: 'thumb',
// };

// // check if named transformation with name 'transformationName' already exists
// const namedTransformationExists = await cloudinary.api.transformation('t_' + transformationName);

// console.log('namedTransformationExists');
// console.log(namedTransformationExists);
// console.log(namedTransformationExists.name);

// // if doesnt exist, create new named transformation
// if (namedTransformationExists.name !== transformationName) {
// const result = await cloudinary.api.create_transformation(transformationName, transformationSettings);
// console.log(result);
// }
