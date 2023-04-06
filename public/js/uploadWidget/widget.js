// widget.js

export function launchWidget(options, callback) {
  console.log('FE => LAUNCHING WIDGET');
  cloudinary.openUploadWidget(options, callback);
}

export async function setSignatureOptions(folderName) {
  console.log('FE => UPLOADCLIENTWIDGET');

  // GET SIGNATURE, tell Cloudinary in advance what folder to upload to
  // The signature is thereafter only valid for requested folder name
  console.log('FE => GETTING SIGNATURE');
  const signatureUrl = '/upload/get-signature-widget';
  const signatureData = { uploadToFolder: folderName };
  console.log('IN FE SUBMIT FUNCTION, getting signature for WIDGET');
  const signatureResponse = await fetch(signatureUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signatureData),
  });
  return signatureResponse;
}

export async function sendImageDataToServer(result) {
  console.log('FE => sendImageDataToServer');
  const url = '/upload/save-image-data';
  const data = {
    public_id: result.info.public_id,
    format: result.info.format,
    width: result.info.width,
    height: result.info.height,
    bytes: result.info.bytes,
    resource_type: result.info.resource_type,
    created_at: result.info.created_at,
    tags: result.info.tags,
    url: result.info.url,
    secure_url: result.info.secure_url,
    original_filename: result.info.original_filename,
    // folder: result.info.folder,
    folder: result.info.folder.split('/')[1],
  };
  console.log('FE => Sending image data to server');

  const sendData = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // get the DB save result from the server
}

export async function processResults(error, result) {
    let uploadCount = 0; // number of uploads added to queue
    let successCount = 0; // number of successful uploads
    let errorCount = 0; // number of failed uploads
  
    console.log(`>>>> Logging all result.events: ${result.event}`);
  
    // Upload was added to queue. Increment uploadCount
    if (!error && result && result.event === 'upload-added') {
      uploadCount++;
    }
  
    // Upload failed. Increment errorCount. Error displayed inside widget.
    if (error) {
      console.log(error);
      errorCount++;
    }
  
    // Upload was successful. Send the result object to backend. Increment successCount
    if (!error && result && result.event === 'success') {
      // Send the result object to backend to save image data in database
      // When multiple images are uploaded, this event happens for each image
      const serverResponseData = await sendImageDataToServer(result); // returns {success: true or false}
      console.warn(serverResponseData)
      console.warn(serverResponseData.success)
      console.warn(serverResponseData.folder)
      if (serverResponseData.success === true) successCount++;
    }
  
    // All uploads were successful. Done button is active. Close with 'Done' button.
    if (!error && result && result.event == 'close') {
      console.warn('CLOSED')
      console.table(`CountUploads: ${uploadCount}, Successful: ${successCount}, Errors ${errorCount}`);
      // In a separate script, observer is listening for data-set attribute changes to dataDivResults
      // When the attribute changes, the observer will redirect to the album page
      if (uploadCount > 0 && uploadCount === successCount) {
        console.log(`>>>> Successful: ${successCount} === CountUploads: ${uploadCount}`);
        const dataDivResults = document.getElementById('dataDivResults');
        dataDivResults.dataset.uploadResult = 'success';
      }
    }
  
    // Some uploads failed, some were successful. Done button gryed out. Close with 'X'.
    if (!error && result && result.event == 'abort') {
      console.warn('ABORTED')
      console.table(`CountUploads: ${uploadCount}, Successful: ${successCount}, Errors ${errorCount}`);
      // In a separate script, observer is listening for data-set attribute changes to dataDivResults
      // When the attribute changes, the observer will redirect to the album page
      if (uploadCount > 0 && uploadCount === successCount + errorCount) {
        const dataDivResults = document.getElementById('dataDivResults');
        dataDivResults.dataset.uploadResult = 'success';
      }
    }
  };