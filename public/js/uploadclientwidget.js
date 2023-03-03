document.addEventListener('DOMContentLoaded', async () => {
  console.log('FE => UPLOADCLIENTWIDGET');

  // TODO: get foldername from current url e.g /albums/albumname
  const dataDiv = document.getElementById('dataDiv');
 
  console.log(dataDiv.dataset.testName)
  console.log(dataDiv.dataset.albumName)

  const folderName = dataDiv.dataset.albumName

  // GET SIGNATURE
  // The signature is only valid for requested folder name
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
  const data = await signatureResponse.json();

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
 
      // var str = JSON.stringify(result, null, 4);
      // document.getElementById('uwdata').innerHTML += str;
      // console.log(str)

    }
    if (!error && result && result.event == "close"){
      console.log('Widget window closed. Page will refresh and scroll to top')
      const dataDivResults = document.getElementById('dataDivResults')
      dataDivResults.dataset.uploadResult = "success"

      reloadAndScrollToTop();
      function reloadAndScrollToTop() {
        location.reload();
        window.scrollTo(0, 0);
    }
    
    }
  };


  const myWidget = window.cloudinary.createUploadWidget(options, processResults);
  document.getElementById('upload_widget').addEventListener('click', () => myWidget.open(), false);
});
