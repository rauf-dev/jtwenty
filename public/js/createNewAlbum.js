/**
 * This script initiates the creation of a new folder in cloudinary and database,
 * when successful, DOM item(s) are made visible allowing user to continue with uploading images.
 **/

const formAlbumName = document.getElementById('formAlbumName');
formAlbumName.addEventListener('submit', handleFormSubmit);

/**
 * Event handler for a form submit event.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  console.log('handleFormSubmit');

  const form = event.currentTarget;
  // const url = form.action;
  const url = new URL('/newalbum', window.location.origin);

  console.log('form is: ', form);

  try {
    // Getting FormData and URL for the fetch() request
    const formData = new FormData(form);
    console.log('formData is: ', formData);

    const responseData = await postFormDataAsJson({ url, formData });
    console.log('responseData is: ', responseData);

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
  console.log('postFormDataAsJson');
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
  const uploadWidget = document.getElementById('upload_widget_new_album'); // text content to be added to button
  const viewNewAlbumButtonDIV = document.getElementById('viewNewAlbumButtonDIV'); // div to be un-hidden
  const albumNameInput = document.getElementById('albumName'); // input field to be disabled
  const hintField = document.getElementById('hint'); // to be hidden
  const dataDiv = document.getElementById('dataDiv'); // albumname will populated into data-album-name attribute
  const message = document.getElementById('resultsMessage'); // message to be inserted, class name added
  const successMessage = `Album ${albumName} created.`;

  message.textContent = successMessage;
  message.className += ' text-success';

  viewNewAlbumButtonDIV.classList.toggle('hidden');
  uploadWidget.textContent = `Add images to ${albumName}`;
  dataDiv.setAttribute('data-album-name', albumName);

  hintField.style.display = 'none';
  albumNameInput.disabled = true;
  createNewAlbumButton.style.display = 'none';
}

function showErrorMessage(responseData) {
  console.log('in showErrorMessage function');
  const message = document.getElementById('resultsMessage'); // to be defined
  const errorMessage = responseData.error;

  message.textContent = errorMessage;
  message.className += ' text-danger';
}
