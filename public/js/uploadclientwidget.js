const viewNewAlbumButtonDIV = document.getElementById('viewNewAlbumButtonDIV');

const observer = new IntersectionObserver((entries) => {
  console.log('FE => IntersectionObserver');
  if (entries[0].isIntersecting === true) {
    console.log('FE => viewNewAlbumButtonDIV is visible');
    // Get the album name from the "data-album-name" dataset attribute
    // In HTML, its non-CamelCase "data-album-name". Dataset attribute is converted to CamelCase "dataset.albumName"
    const dataDiv = document.getElementById('dataDiv');
    const folderName = dataDiv.dataset.albumName;
    console.log('FE => IntersectionObserver => folderName is ' + folderName);
    getSignature(folderName);
    // Now wait for user to click on the button to add images to album
    // Open the widget from new album button
  } else {
    console.log('FE => viewNewAlbumButtonDIV is NOT visible');
    // viewNewAlbumButtonDIV is NOT visible
  }
});

window.addEventListener('DOMContentLoaded', (event) => {
  const folderName = 'preloading-signature';
  getSignature(folderName);
  observer.observe(viewNewAlbumButtonDIV);
});

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

  // Get the signature from the response
  const data = await signatureResponse.json();
  const options = createUploadOptions(data); // function options should return the options object
  return options;
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
  };
  console.log('FE => Options are');
  console.log(options);
  return options;
}

const processResults = (error, result) => {
  if (!error && result && result.event === 'success') {
    console.log('Upload was successfull, below the result');
    console.log(result);
  }
  if (!error && result && result.event == 'close') {
    console.log('Widget window closed. Page will refresh and scroll to top');
    const dataDivResults = document.getElementById('dataDivResults');
    dataDivResults.dataset.uploadResult = 'success';

    reloadAndScrollToTop();
    function reloadAndScrollToTop() {
      location.reload();
      window.scrollTo(0, 0);
    }
  }
};

const myWidget = window.cloudinary.createUploadWidget(uploadOptions, processResults);
document.getElementById('upload_widget').addEventListener('click', () => {
  const folderName = e.target.dataset.albumName;
  getSignature(folderName);
  myWidget.open();
});

// document.getElementsByClassName('addImagesToAlbum').addEventListener('click', () => myWidget.open(), false);

// Open the widget from existing albums list
const widgetTriggersNavList = document.getElementsByClassName('addImagesToAlbum');
Array.from(widgetTriggersNavList).forEach((element) => {
  element.addEventListener('click', (e) => {
    const folderName = e.target.dataset.albumName;
    getSignature(folderName);
    myWidget.open();
  });
});
