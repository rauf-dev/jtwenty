import cloudinary from 'cloudinary';
import cldMainFolder from './cloudinaryMainFolder.js'

// @ args: foldername
// @returns: object with details of each image inside folder
export const getAllResourcesPerFolder = async function (folderName) {
  console.log('IN getAllResourcesPerFolder FUNCTION');
  try {
    const response = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: `${cldMainFolder}${folderName}`,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getAllResourcesPerFolder;

/**
SAMPLE RESPONSE
{
  resources: [
    {
      asset_id: '84173ad027b0d570667fe751e8aa52c0',
      public_id: 'samples/people/bicycle',
      format: 'jpg',
      version: 1663832935,
      resource_type: 'image',
      type: 'upload',
      created_at: '2022-09-22T07:48:55Z',
      bytes: 1130015,
      width: 2889,
      height: 1926,
      folder: 'samples/people',
      url: 'http://res.cloudinary.com/dzcyxehoa/image/upload/v1663832935/samples/people/bicycle.jpg',
      secure_url: 'https://res.cloudinary.com/dzcyxehoa/image/upload/v1663832935/samples/people/bicycle.jpg'
    },
    {
      asset_id: 'f71f20a55ee04f3e4eee19ff5e9976ec',
      public_id: 'samples/people/boy-snow-hoodie',
      format: 'jpg',
      version: 1663832933,
      resource_type: 'image',
      type: 'upload',
      created_at: '2022-09-22T07:48:53Z',
      bytes: 581238,
      width: 1777,
      height: 1332,
      folder: 'samples/people',
      url: 'http://res.cloudinary.com/dzcyxehoa/image/upload/v1663832933/samples/people/boy-snow-hoodie.jpg',
      secure_url: 'https://res.cloudinary.com/dzcyxehoa/image/upload/v1663832933/samples/people/boy-snow-hoodie.jpg'
    },
    {
      asset_id: '052f523d026f0bcdb11cafb49354e3dd',
      public_id: 'samples/people/jazz',
      format: 'jpg',
      version: 1663832933,
      resource_type: 'image',
      type: 'upload',
      created_at: '2022-09-22T07:48:53Z',
      bytes: 695548,
      width: 3000,
      height: 1993,
      folder: 'samples/people',
      url: 'http://res.cloudinary.com/dzcyxehoa/image/upload/v1663832933/samples/people/jazz.jpg',
      secure_url: 'https://res.cloudinary.com/dzcyxehoa/image/upload/v1663832933/samples/people/jazz.jpg'
    }
  ],
  rate_limit_allowed: 500,
  rate_limit_reset_at: 2022-12-04T17:00:00.000Z,
  rate_limit_remaining: 471
}
 */
