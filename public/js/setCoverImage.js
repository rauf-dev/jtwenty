// cover image boolean value will be stored in db

// in a separate script, for landing page;
// if no images in album, set default image as album card image
// if a coverImage boolean is true in db, image will be set as album card image
// if no coverImage boolean is true in db, the first image in album will be set as album card image

// in view album page, radio button value will be set to true/false as per db
// if user clicks on radio button, set the image as cover image by sending a post request to the server

/*
Event listener to listen for a click on any radio button, get its parent dataset values , and do the following;
- send a post request to the server with parent element dataset values
- get back a success response from server
- set radio button value to true
- if error response from server, set radio button value to false
<div class="set-cover-image">
    <input class="form-check-input" type="radio" name="album-cover" id="album-cover-644ea5aea227773b70f960d3" value="644ea5aea227773b70f960d3">
</div>
*/

const setCoverImage = () => {
  const setCoverImageDivs = document.querySelectorAll('.set-cover-image');
  setCoverImageDivs.forEach((div) => {
    // check which radio button has input value true and set it to checked
    const radioButtons = div.querySelectorAll('input');
    radioButtons.forEach((radioButton) => {
      if (radioButton.value === 'true') {
        radioButton.checked = true;
      }
    });

    // Now start listening for when user clicks to change cover image
    div.addEventListener('click', async (e) => {
      console.log('clicked');
      const albumName = e.target.parentElement.dataset.albumnameCoverimage;
      const albumId = e.target.parentElement.dataset.albumidCoverimage;
      const imageId = e.target.parentElement.dataset.imageidCoverimage;
      const imagePublicId = e.target.parentElement.dataset.imagepublicidCoverimage;
      const data = {
        albumId: albumId,
        imageId: imageId,
        albumName: albumName,
        imagePublicId: imagePublicId,
      };


      //send post request to server
      const sendData = await fetch('/set-cover-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('sendData', sendData);

      // get response from server
      const response = await sendData.json(); 
      console.log('response', response); // {setCoverImageResult: 'success' or 'error'}

      // if response is success, set radio button value to true
      if (response.setCoverImageResult === 'success') {
        // Reset all radio buttons value to false
        console.log('Re-setting all radio buttons to false');
        const radioButtons = e.target.parentElement.querySelectorAll('input');
        radioButtons.forEach((radioButton) => {
          radioButton.value = false;
          radioButton.checked = false;
        });
        
        // Now set the clicked radio button value to true
        console.log('Setting to true')
        e.target.value = true;
        e.target.checked = true;


      }
      // if response is error, set radio button value to false
      if (response.status === 'error') {
        e.target.value = false;
      }
    });
  });
};

setCoverImage();
