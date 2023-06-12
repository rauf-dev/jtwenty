// Get the modal from the DOM
const deleteAlbumModal = document.getElementById('delete-album-modal');

// Clicking on any button anywhere in the page with the data-bs-target="#delete-album-modal" attribute will trigger the modal
deleteAlbumModal.addEventListener('show.bs.modal', async (event) => {
  // Button that triggered the modal, retrieves the data-bs-* attributes from it
  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  const albumName = button.getAttribute('data-bs-albumname');
  const imageCount = button.getAttribute('data-bs-imagecount');
  const albumId = button.getAttribute('data-bs-albumid');

  //Capitalize the first letter of the album name
  function capitalizeWords(sentence) {
    return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  const capitalizedAlbumName = capitalizeWords(albumName);

  // Update the modal's content.
  const modalTitle = deleteAlbumModal.querySelector('#insert-modal-album-name');
  const modalBodyInput = deleteAlbumModal.querySelector('#insert-modal-body-text');

  modalTitle.textContent = `Confirm Delete Album "${capitalizedAlbumName}"`;
  if (imageCount === '0') {
    modalBodyInput.innerHTML = `Delete empty album "${capitalizedAlbumName}"? This action cannot be undone.`;
  } else if (imageCount === '1') {
    modalBodyInput.innerHTML = `Delete album "${capitalizedAlbumName}" with ${imageCount} image inside it? This action cannot be undone.`;
  } else  {
    modalBodyInput.innerHTML = `Delete album "${capitalizedAlbumName}" with ${imageCount} images inside it? This action cannot be undone.`;
  }

  // Build the url for deleting via fetch api
  const url = new URL(`deletealbum/${albumId}`, window.location.origin);

  // Build the optings for the fetch api delete request
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // add event listener to delete button
  const deleteButton = deleteAlbumModal.querySelector('#delete-album-button');
  deleteButton.addEventListener('click', async () => {
    const deleteAlbum = await fetch(url, options);
    const deleteAlbumResponse = await deleteAlbum.json();
    // returns one of the below
    // { success: { acknowledged:true, deleteCount:1 } } or
    // { error: { acknowledged:true, deleteCount:0 } }
    console.log(deleteAlbumResponse);

    // Close the bootstrap 5 modal
    // const modal = bootstrap.Modal.getInstance(deleteAlbumModal);

    // If the delete was successful, close the modal. Otherwise, do nothing
    if (deleteAlbumResponse.success) {
      // window.location.reload();
      const modal = bootstrap.Modal.getInstance(deleteAlbumModal);
      deleteAlbumListItemFromNavBar(albumId);
      modal.hide();
    }
  });

  // Animates deleting the album from the navbar
  function deleteAlbumListItemFromNavBar(albumId) {
    const listItem = document.getElementById(albumId);
    listItem.classList.add('deleted');
    listItem.style.animation = 'deleteAlbumAnimation 0.9s forwards';

    if (listItem) {
      setTimeout(() => listItem.remove(), 1000);
      // listItem.remove();
    }

  }
});
