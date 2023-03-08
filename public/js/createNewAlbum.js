/**
 * This script creates a new folder in cloudinary,
 * when successful DOM item(s) are made visible allowing user to continue with uploading images.
 **/

// For the fetch() POST request
const formAlbumName = document.getElementById('formAlbumName');
formAlbumName.addEventListener('submit', handleFormSubmit);

/**
 * Event handler for a form submit event.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);

    // makes a POST request to backend route "/newalbum"
    // backend tries to create new folder in cloudinary "create-folder" API
    // backend gets the reply from cloudinary "create-folder" API
    // reply is returned as responseData
    const responseData = await postFormDataAsJson({ url, formData });
    console.log('responseData is: ', responseData);
    // failed responseData is:
    // foldername: "Amsterdam"
    // message: "A folder with same name already exists"
    // success: false

    // albumName: 'my nninenth album',
    // albumPath: 'jtwenty_01/my nninenth album',
    // _id: new ObjectId("6408a05948a8d59d195e695d"),
    // createdAt: 2023-03-08T14:48:57.574Z,
    // albumImages: [],
    // __v: 0

    if (responseData.error) {
      showErrorMessage(responseData);
      return;
    } else {
      const newAlbumName = responseData.savedAlbum.albumName;
      const path = responseData.savedAlbum.albumPath;
      showSuccessMessageAndNextButton(newAlbumName, path); //!send all responseData?
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
/**
 * Helper function create and show DOM elements
 * @param {string} albumName
 */
function showSuccessMessageAndNextButton(albumName, path) {
  console.log('in showSuccessMessageAndNextButton function');
  const createNewAlbumButton = document.getElementById('createNewAlbumButton'); // to be hidden
  const viewNewAlbumButton = document.getElementById('viewNewAlbumButton'); // href url to be added
  const viewNewAlbumButtonDIV = document.getElementById('viewNewAlbumButtonDIV'); // to be un-hidden
  const albumNameInput = document.getElementById('albumName'); // to be disabled
  const hintField = document.getElementById('hint'); // to be hidden

  const message = document.getElementById('resultsMessage'); // to be defined
  const successMessage = `Album ${albumName} created.`;

  message.textContent = successMessage;
  message.className += ' text-success';

  viewNewAlbumButtonDIV.classList.toggle('hidden');
  viewNewAlbumButton.textContent = `Add images to ${albumName}`;
  viewNewAlbumButton.href = `/${path}`;

  hintField.style.display = 'none';
  albumNameInput.disabled = true;
  createNewAlbumButton.style.display = 'none';

  // testDiv.innerHTML = '<h6>different heading</h6><p>and different paragraph</p>'
}

function showErrorMessage(responseData) {
  console.log('in showErrorMessage function');
  const message = document.getElementById('resultsMessage'); // to be defined
  const errorMessage = responseData.error;

  message.textContent = errorMessage;
  message.className += ' text-danger';
}
