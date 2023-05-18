// cover image boolean value will be stored in db

// in a separate script, for landing page;
// if a coverImage boolean is true in db, image will be set as album card image
// if no coverImage boolean is true in db, the first image in album will be set as album card image

// in view album page, none is selected as cover image per default.
// if user clicks on radio button, set the image as cover image by sending a post request to the server

/*
Event listener to listen for a click on any radio button, get its value, and send a post request to the server
<div class="set-cover-image">
    <input class="form-check-input" type="radio" name="album-cover" id="album-cover-644ea5aea227773b70f960d3" value="644ea5aea227773b70f960d3">
</div>
*/

const setCoverImage = () => {
  const setCoverImageDivs = document.querySelectorAll('.set-cover-image');
  setCoverImageDivs.forEach((div) => {
    div.addEventListener('click', async (e) => {
      console.log('clicked');
      const albumName = e.target.parentElement.dataset.albumnameCoverimage;
      const albumId = e.target.parentElement.dataset.albumidCoverimage;
      const imageId = e.target.parentElement.dataset.imageidCoverimage;
      const data = {
        albumId: albumId,
        imageId: imageId,
        albumName: albumName,
      };

      //write value of radio button to DOM
      e.target.value = true;
      //send post request to server
      const sendData = await fetch('/set-cover-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('sendData', sendData);
    });
  });
};

setCoverImage();
