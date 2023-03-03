// const api_key = '666125344814648';
// const cloud_name = 'dzcyxehoa';
// It's okay for these to be public on client-side JS

document
  .querySelector('#upload-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('IN FE SUBMIT FUNCTION');

    // TODO: get foldername from current url e.g /albums/albumname
    const folderName = 'tokyo';

    // GET SIGNATURE
    // The signature is only valid for requested destination folder
    const signatureUrl = '/uploadform/get-signature';
    const signatureData = { uploadToFolder: folderName };
    console.log('IN FE SUBMIT FUNCTION, getting signature for FORM');
    const signatureResponse = await fetch(signatureUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signatureData),
    });
    const signatureResponseJson = await signatureResponse.json();
    
    console.log('HERE COMES THE SIGNATURE RESPONSE')
    console.log(signatureResponseJson);

    // UPLOAD FILE(S)
    // TODO: upload multiple files?
    const data = new FormData();
    data.append('file', document.querySelector('#file-field').files[0]);
    data.append('api_key', signatureResponseJson.apikey);
    data.append('signature', signatureResponseJson.signature);
    data.append('timestamp', signatureResponseJson.timestamp);
    data.append('folder', signatureResponseJson.folder);
    data.append('cloudName', signatureResponseJson.cloudname);

    console.log('HERE COMES THE FORM DATA')
    console.log(data);

    const url = `https://api.cloudinary.com/v1_1/${signatureResponseJson.cloudname}/auto/upload`;
    // const url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;
    const fetchOptions = {
      method: 'post',
      body: data,
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total);
      },
    };

    console.log('IN FE SUBMIT FUNCTION, uploading via fetch ');
    const cloudinaryResponse = await fetch(url, fetchOptions);
    console.log('IN FE SUBMIT FUNCTION, Here comes final response');
    console.log(cloudinaryResponse);

    // USE THE RESPONSE DATA IF NEEDED IN FUTURE
    // send the image info back to our server e.g.
    // post('/do-something-with-photo', photoData);
    /** 
   const cloudinaryResponseJson = await cloudinaryResponse.json();
    const photoData = {
    public_id: cloudinaryResponseJson.public_id,
    version: cloudinaryResponseJson.version,
    signature: cloudinaryResponseJson.signature,
  };
  **/
  });
