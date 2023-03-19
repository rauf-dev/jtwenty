/**
 * This file is for the signed upload widget. The sequence of events is as follows:
 * 1. Before upload widget is fired up, the signature must be obtained in advance.
 *    The signature must contain the destination folder name.
 *    - The folder name is obtained from the dataset attribute "data-album-name" in the HTML.
 * 2. Folder name is used to get the signature for the upload widget.
 *    Now we have the signature and waiting for the user to initialize the widget.
 *
 * 3. Two ways in which the upload widget is initialized. Both are only found in the Nav bar:
 *    3.1. Create new album:
 *    After creating a new album, a button to add images to new album is shown.
 *    This button triggers the upload widget.
 *    3.2. In the existing albums list. Each album has an icon(link) to add images to album.
 *    When user clicks on the icon to add images, this triggers the upload widget
 */

// For 3.2. In the existing albums list
// When DOM content is loaded, run setSignatureOptions function to get the signature in advance
// This is for the ul - li album elements in Nav bar
// So that when user clicks on link to add images to album, the upload widget is fired up
window.addEventListener('DOMContentLoaded', (event) => {
  const navAlbumsFromList = document.getElementsByClassName('addImagesToAlbum');
  // Iterate over the array of elements and add event listener to each
  Array.from(navAlbumsFromList).forEach((element) => {
    element.addEventListener('click', (e) => {
      // e.preventDefault();
      const folderName = e.target.dataset.albumName;
      setSignatureOptions(folderName);
    });
  });
});

// For 3.1. Create new album: Get album name
const viewNewAlbumButtonDIV = document.getElementById('viewNewAlbumButtonDIV');

// The DIV "viewNewAlbumButtonDIV" is set to display: none in css using the class "hidden"
// In "createNewAlbum.js" file, when the user successfully creates a new album;
//  - The field "albumName" is populated with the new album name,
//  - and the "viewNewAlbumButtonDIV" is un-hidden
// The IntersectionObserver is to check if the DIV is visible or not
// If it is visible, then the upload widget is fired up
// ! Have to wait to be visible because only then do we know the album name
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting === true) {
    console.log('FE => viewNewAlbumButtonDIV is visible');
    // Get the album name from the "data-album-name" dataset attribute
    // In HTML, its non-CamelCase "data-album-name". Dataset attribute is converted to CamelCase "dataset.albumName"
    const dataDiv = document.getElementById('dataDiv');
    const folderName = dataDiv.dataset.albumName;
    setSignatureOptions(folderName);
  } else {
    console.log('FE => viewNewAlbumButtonDIV is NOT visible');
    // viewNewAlbumButtonDIV is NOT visible
  }
});
observer.observe(viewNewAlbumButtonDIV);

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

  // Use signature data to build the options needed to create the widget
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

  const myWidget = window.cloudinary.createUploadWidget(options, processResults);
  // document.getElementById('upload_widget').addEventListener('click', () => myWidget.open(), false);
  // document.getElementsByClassName('addImagesToAlbum').addEventListener('click', () => myWidget.open(), false);

  // Open the widget
  const widgetTriggers = document.getElementsByClassName('addImagesToAlbum');
  Array.from(widgetTriggers).forEach((element) => {
    element.addEventListener('click', (e) => {
      // e.preventDefault();
      myWidget.open();
    });
  });
};
