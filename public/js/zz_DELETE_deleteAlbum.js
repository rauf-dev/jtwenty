window.addEventListener('DOMContentLoaded', (event) => {

  addNameOfFolderToBeDeleted();

  // For the fetch() POST request
  const formDeleteAlbum = document.getElementById('formDeleteAlbum');
  formDeleteAlbum.addEventListener('submit', handleFormSubmit);

  // For the modal displayed after delete action
  // Shows success or orror of delete action
  const resultsModal = document.getElementById('results-modal');
  const bsResultsModal = new bootstrap.Modal(resultsModal);
  const modalMessage = document.getElementById('modalMessage');

  // Inserts value into hidden input field
  function addNameOfFolderToBeDeleted() {
    const folderToBeDeleted = document.getElementById('foldername');
    const path = window.location.pathname.split('/');
    let pathLastWord = path[path.length - 1];
    //decodeURI removes %20 inserted as space character in the url
    folderToBeDeleted.value = decodeURI(pathLastWord);;
  }

  /**
   * Event handler for a form submit event.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
   * @param {SubmitEvent} ev
   */
  async function handleFormSubmit(ev) {
    // makes a POST request to backend route "/delete-folder"
    // backend tries to delete folder in cloudinary "delete-folder" API
    // if folder is not empty, backend deletes resources inside folder then deletes folder
    // backend gets the reply from cloudinary "create-folder" API
    // reply is returned as responseData
    console.log(`Form Submit button clicked! Timestamp: ${ev.timeStamp}`);
    ev.preventDefault();

    const form = ev.currentTarget;
    const url = form.action;

    try {
      const formData = new FormData(form);

      const responseData = await postFormDataAsJson({ url, formData });

      if (responseData[1].success === true) {
        const deletedFolder = responseData[0].cldResponse.deleted[0].split('/');
        deletedFolder.shift();

        modalMessage.innerText = `Folder ${deletedFolder} deleted`;
        bsResultsModal.show();
      } else {
        modalMessage.innerText = `${responseData[0].cldResponse.message}. ${responseData[0].cldResponse.http_code}`;
        bsResultsModal.show();
      }
    } catch (error) {
      console.error(error);
    }

    // POST FORM DATA
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
        // network errors etc. Not cloudinary API errors
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    }
  }
});

// EXAMPLE RESPONSE from const responseData = await postFormDataAsJson({ url, formData });
// SAMPLE RESPONSE WHEN DELETE SUCCESSFULL
// {
//   "responseData": [
//     {
//       "cldResponse": {
//         "deleted": [
//           "samples/001"
//         ],
//         "rate_limit_allowed": 500,
//         "rate_limit_reset_at": "2023-01-15T09:00:00.000Z",
//         "rate_limit_remaining": 472
//       }
//     },
//     {
//       "success": true
//     }
//   ]
// }

// SAMPLE RESPONSE WHEN DELETE NOT SUCCESSFULL
// {
//   "responseData": [
//     {
//       "cldResponse": {
//         "message": "Can't find folder with path samples/xyzzzzz",
//         "http_code": 404
//       }
//     },
//     {
//       "success": false
//     }
//   ]
// }
