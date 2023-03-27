const viewNewAlbumButtonDIV = document.getElementById('viewNewAlbumButtonDIV'); //to be observed when visible
const dataDiv = document.getElementById('dataDiv'); //to get the folder name from the dataset attribute
const widgetTrigger = document.getElementById('upload_widget_new_album'); //to trigger the widget
let viewNewAlbumButtonDIVisVisible = false;
let options = {};

const setSignatureOptions = async (folderName) => {
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
};

// Use signature data to build the options needed to create the widget
function createOptionsObj(data) {
  const options = {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    cropping: false,
    folder: data.folder,
    showAdvancedOptions: true,
    showCompletedButton: true,
    multiple: true,
    maxFiles: 10,
    sources: ['local', 'url', 'camera', 'dropbox', 'instagram'],
    maxFileSize: 10000000, // 10MB
  };
  return options;
}

const sendImageDataToServer = async (result) => {
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
  const responseData = await sendData.json();
  console.log('FE => Response from server');
  console.log(responseData);
  return responseData;
};


let successfulUploads = 0;
let uploadCount = 0;
const processResults = async (error, result) => {
  console.log(`>>>> Logging all result.events: ${result.event}`);
  if (error) {
    console.log(error);
  }
  if (!error && result && result.event === 'upload-added') {
    uploadCount++;
  }
  if (!error && result && result.event === 'success') {
    // Send the result object to backend to save image data in database
    // When multiple images are uploaded, this event happens for each image
    const serverResponseData = await sendImageDataToServer(result); // returns {success: true or false}
    successfulUploads++;
  }
  if (!error && result && result.event == 'close') {
    // In a separate script, observer is listening for data-set attribute changes to dataDivResults
    // When the attribute changes, the observer will redirect to the album page
    if (uploadCount > 0 && successfulUploads === uploadCount) {
      console.log(`>>>> Successful uploads: ${successfulUploads} === Count uploads: ${uploadCount} (true)`);
      const dataDivResults = document.getElementById('dataDivResults');
      dataDivResults.dataset.uploadResult = 'success';
    } else {
      console.log(`>>>> Successful uploads: ${successfulUploads} === Count uploads: ${uploadCount} (false)`);
    }
  }
};

const launchWidget = () => {
  console.log('FE => Launching widget');
  const myWidget = window.cloudinary.createUploadWidget(options, processResults);
  myWidget.open();
};

const observer = new IntersectionObserver((entries) => {
  console.log('FE => IntersectionObserver');
  if (entries[0].isIntersecting === true) {
    console.log('FE => viewNewAlbumButtonDIV is visible');
    viewNewAlbumButtonDIVisVisible = true;

    // async anonymous function to excecute the rest of this code below
    (async () => {
      // Get the album name from the "data-album-name" dataset attribute
      const folderName = dataDiv.dataset.albumName;
      console.log('FE => IntersectionObserver => folderName is ' + folderName);
      // Get the signature from the response
      const signatureResponse = await setSignatureOptions(folderName);
      const data = await signatureResponse.json();
      options = createOptionsObj(data); // function options should return the options object
      // Now wait for user to click on the button to add images to album

      // Open the widget from new album button
      widgetTrigger.addEventListener('click', () => {
        launchWidget();
      });
    })();
  } else {
    console.log('FE => viewNewAlbumButtonDIV is NOT visible');
    viewNewAlbumButtonDIVisVisible = false;
  }
});

window.addEventListener('DOMContentLoaded', async (event) => {
  console.log('FE => DOMContentLoaded');
  observer.observe(viewNewAlbumButtonDIV);
});
