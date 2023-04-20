const addImagesButtonDIV = document.getElementById('viewNewAlbumButtonDIV'); //to be observed when visible
const dataDiv = document.getElementById('dataDiv'); //to get the folder name from the dataset attribute
const widgetTriggerFromNewAlbum = document.getElementById('upload_widget_new_album'); //to trigger launch of the widget from new album form
let addImagesButtonDIVisVisible = false; //flag to indicate if the viewNewAlbumButtonDIV is visible. Is set to visible by a separate script "createNewAlbum.js " after user creates a new album successfully
let uploadOptions = {}; //will be populated with the options needed to create the widget
const dataDivResults = document.getElementById('dataDivResults'); // will be populated with the upload success data from widget. This element is monitored by an observer in a separate script
const widgetTriggerFromExistingAlbums = document.querySelectorAll('.upload_widget');


const getSignature = async (folderName) => {
  // GET SIGNATURE, tell Cloudinary in advance what folder to upload to
  // The signature is thereafter only valid for requested folder nam
  const signatureUrl = '/upload/get-signature-widget';
  const signatureData = { uploadToFolder: folderName };
  const signatureResponse = await fetch(signatureUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signatureData),
  });
  return signatureResponse;
};

// Use signature data to build the options needed to create the widget
function createUploadOptions(data){
  return {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    cropping: false,
    folder: data.folder,
    // tags: ['album'],
    // tags: [data.folder, "jtwentyAlbums"],
    showAdvancedOptions: true,
    showCompletedButton: true,
    multiple: true,
    maxFiles: 10,
    sources: ['local', 'url', 'camera', 'dropbox', 'instagram'],
    maxFileSize: 10000000, // 10MB
  };
};

const sendImageDataToServer = async (result) => {
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
    folder: result.info.folder.split('/')[1],
  };

  const sendData = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // get the DB save result from the server
  const responseData = await sendData.json();
  return responseData;
};

let uploadCount = 0; // number of uploads added to queue
let successCount = 0; // number of successful uploads
let errorCount = 0; // number of failed uploads
const processResults = async (error, result) => {

  console.log(result.event)

  // Upload was added to queue. Increment uploadCount
  if (!error && result && result.event === 'upload-added') {
    uploadCount++;
    console.log('#############################')
    console.log('upload added to queue')
    console.log(`uploadCount: ${uploadCount}`)
    console.log(`successCount: ${successCount}`);
    console.log(`errorCount: ${errorCount}`)
    console.log('#############################')
  }

  // Upload failed. Increment errorCount. Error displayed inside widget.
  if (error) {
    errorCount++;
    console.log('#############################');
    console.log('Error:');
    console.log(`uploadCount: ${uploadCount}`);
    console.log(`successCount: ${successCount}`);
    console.log(`errorCount: ${errorCount}`);
    console.log('#############################');
  }
  
  // Upload was successful. Send the result object to backend. Increment successCount
  if (!error && result && result.event === 'success') {
    // Send the result object to backend to save image data in database
    // When multiple images are uploaded, this event happens for each image
    const serverResponseData = await sendImageDataToServer(result); // returns {success: true or false}
    console.log(`serverResponseData: ${serverResponseData}`)
    if (serverResponseData.success === true) {
      successCount++;
      console.log('#############################');
      console.log('Success:');
      console.log(`uploadCount: ${uploadCount}`);
      console.log(`successCount: ${successCount}`);
      console.log(`errorCount: ${errorCount}`);
      console.log('#############################');
    }
  }

  // All uploads were successful. Done button is active. Close with 'Done' button.
  if (!error && result && result.event === 'close') {
    console.log('#############################');
    console.log('Close:');
    console.log(`uploadCount: ${uploadCount}`);
    console.log(`successCount: ${successCount}`);
    console.log(`errorCount: ${errorCount}`);
    console.log('#############################');
    // In a separate script, observer is listening for data-set attribute changes to dataDivResults
    // When the attribute changes, the observer will redirect to the album page
    if (uploadCount > 0 && uploadCount === successCount + errorCount) {
      console.log('#############################');
      console.log('CLOSE => UploadCount = SuccessCount:');
      console.log(`uploadCount: ${uploadCount}`);
      console.log(`successCount: ${successCount}`);
      console.log(`errorCount: ${errorCount}`);
      console.log('#############################');
      dataDivResults.dataset.uploadResult = 'success';
    }
  }

  // Some uploads failed, some were successful. Done button gryed out. Close with 'X'.
  if (!error && result && result.event === 'abort') {
    console.log('#############################');
    console.log('Abort:');
    console.log(`uploadCount: ${uploadCount}`);
    console.log(`successCount: ${successCount}`);
    console.log(`errorCount: ${errorCount}`);
    console.log('#############################');
    // In a separate script, observer is listening for data-set attribute changes to dataDivResults
    // When the attribute changes, the observer will redirect to the album page
    if (uploadCount > 0 && uploadCount === successCount + errorCount) {
      console.log('#############################');
      console.log('ABORT => UploadCount = SuccessCount:');
      console.log(`uploadCount: ${uploadCount}`);
      console.log(`successCount: ${successCount}`);
      console.log(`errorCount: ${errorCount}`);
      console.log('#############################');
      dataDivResults.dataset.uploadResult = 'success';
    }
  }
};


const launchWidget = () => {
  console.log(uploadOptions)
  const myWidget = window.cloudinary.createUploadWidget(uploadOptions, processResults);
  myWidget.open();
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting === true) {
    addImagesButtonDIVisVisible = true;

    // async anonymous function to excecute the rest of this code below
    (async () => {
      // Get the album name from the "data-album-name" dataset attribute
      const folderName = dataDiv.dataset.albumName;
      // Get album ID from the "data-album-id" dataset attribute
      const albumID = dataDiv.dataset.albumId;
      // Write album ID to the dataDivResults dataset attribute, will be used in the observer to redirect to album page
      dataDivResults.dataset.albumId = albumID;
      // Get the signature from the response
      const signatureResponse = await getSignature(folderName);
      const data = await signatureResponse.json();
      uploadOptions = createUploadOptions(data); // function options should return the options object
      // Now wait for user to click on the button to add images to album

      // Open the widget from new album button
      widgetTriggerFromNewAlbum.addEventListener('click', () => {
        launchWidget();
      });
    })();
  } else {
    addImagesButtonDIVisVisible = false;
  }
});

window.addEventListener('DOMContentLoaded', async (event) => {
  // Open the upload widget from new album button form
  observer.observe(addImagesButtonDIV);

  // Open the upload widget from existing album 'add' image link
  widgetTriggerFromExistingAlbums.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const dataDivResults = document.getElementById('dataDivResults');
      const folderName = event.currentTarget.dataset.albumName;
      const albumId = event.currentTarget.dataset.albumId;
      console.log(`id: ${albumId}`)
      dataDivResults.dataset.albumId = `${albumId}`;
      const signatureResponse = await getSignature(folderName);
      const data = await signatureResponse.json();
      uploadOptions = createUploadOptions(data); // function options should return the options object
      launchWidget();
    });

  });
});
