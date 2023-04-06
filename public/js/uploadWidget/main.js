// main.js

import {
    launchWidget,
    setSignatureOptions,
    sendImageDataToServer,
    processResults,
  } from "./widget.js";
  
  const viewNewAlbumButtonDIV = document.getElementById("viewNewAlbumButtonDIV"); //to be observed when visible
  const dataDiv = document.getElementById("dataDiv"); //to get the folder name from the dataset attribute
  const widgetTrigger = document.getElementById("upload_widget_new_album"); //to trigger the widget
  let viewNewAlbumButtonDIVisVisible = false;
  let options = {};
  
  viewNewAlbumButtonDIV.addEventListener("click", () => {
    // get folder name from dataset
    const folderName = dataDiv.dataset.folder;
    console.log("FE => LAUNCH WIDGET FOR FOLDER:", folderName);
    setSignatureOptions(folderName)
      .then((res) => res.json())
      .then((data) => {
        options = createOptionsObj(data);
        launchWidget(options, processResults);
      })
      .catch((err) => console.log(err));
  });
  
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
      sources: ["local", "url", "camera", "dropbox", "instagram"],
      maxFileSize: 10000000, // 10MB
    };
    return options;
  }
  