const cloudinary = require('cloudinary');
const cldMainFolder = require('./cloudinaryMainFolder.js');

// DELETE FOLDER (MUST BE EMPTY)
// Takes in a folder name as param
// Returns response from cloudinary
const deleteEmptyFolder = async function (folderName) {
  console.log('IN DELETE FOLDER FUNCTION');
  try {
    console.log(`${cldMainFolder}${folderName}`)
    const response = await cloudinary.v2.api.delete_folder(`${cldMainFolder}${folderName}`);
    return response;
  } catch (error) {
    console.log('CATCHING ERROR IN DELETE EMPTY FOLDER FUNCTION');
    console.log(error);
    return error;
  }
};

// DELETE RESOURCES INSIDE FOLDER
// Takes in a folder name as param
// Returns response from cloudinary
const deleteResourcesInFolder = async function (folderName) {
  console.log('IN DELETE RESOURCES IN FOLDER FUNCTION');
  try {
    const response = await cloudinary.v2.api.delete_resources_by_prefix(`${cldMainFolder}${folderName}`);
    return response;
  } catch (error) {
    console.log('CATCHING ERROR DELETE RESOURCES IN FOLDER');
    console.log(error);
    return error;
  }
};

module.exports = { deleteEmptyFolder, deleteResourcesInFolder };

/**
 * deleteEmptyFolder
 * SAMPLE OK RESPONSE, empty folder
 * {
 *   deleted: [ 'samples/Lamu' ],
 *   rate_limit_allowed: 500,
 *   rate_limit_reset_at: 2022-11-22T09:00:00.000Z,
 *   rate_limit_remaining: 499
 * }
 */

/**
 * deleteResourcesInFolder
 * SAMPLE OK RESPONSE, Assets inside a folder
 * POST /delete-folder 200 151 - 719.870 ms
IN DELETE FOLDER ROUTE
{ foldername: 'food' }
samples/food
{
  deleted: {
    'samples/food/dessert': 'deleted',
    'samples/food/fish-vegetables': 'deleted',
    'samples/food/pot-mussels': 'deleted',
    'samples/food/spices': 'deleted'
  },
  deleted_counts: {
    'samples/food/dessert': { original: 1, derived: 0 },
    'samples/food/fish-vegetables': { original: 1, derived: 0 },
    'samples/food/pot-mussels': { original: 1, derived: 0 },
    'samples/food/spices': { original: 1, derived: 1 }
  },
  partial: false,
  rate_limit_allowed: 500,
  rate_limit_reset_at: 2022-11-23T13:00:00.000Z,
  rate_limit_remaining: 498
}
 */

/**
     * deleteEmptyFolder
     * SAMPLE NOT OK RESPONSE, folder not empty
     * {
      request_options: Url {
        protocol: 'https:',
        slashes: true,
        auth: '666125344814648:exELR4qJjSqoMiER1zDJK5eHrqQ',
        host: 'api.cloudinary.com',
        port: null,
        hostname: 'api.cloudinary.com',
        hash: null,
        search: null,
        query: null,
        pathname: '/v1_1/dzcyxehoa/folders/samples%2Ffood',
        path: '/v1_1/dzcyxehoa/folders/samples%2Ffood',
        href: 'https://api.cloudinary.com/v1_1/dzcyxehoa/folders/samples%2Ffood',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'CloudinaryNodeJS/1.32.0 (Node 18.12.1)',
          'Content-Length': 0
        }
      },
      query_params: '',
      error: { message: 'Folder is not empty', http_code: 400 }
    }
     */
