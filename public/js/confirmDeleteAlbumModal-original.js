const deleteAlbumModal = document.getElementById('delete-album-modal');
deleteAlbumModal.addEventListener('show.bs.modal', async (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  const albumName = button.getAttribute('data-bs-albumname');
  const albumId = button.getAttribute('data-bs-albumid');

  // Update the modal's content.
  const modalTitle = deleteAlbumModal.querySelector('#insert-modal-album-name');
  const modalBodyInput = deleteAlbumModal.querySelector('#insert-modal-body-text');

  modalTitle.textContent = `Confirm Delete ${albumName}`;
  modalBodyInput.innerHTML = `Are you sure you want to <span class="strong">delete ${albumName} and all images inside it</span>? This action cannot be undone.`;
  // const url = new URL(`/deletealbum/${albumId}`);
  const url = new URL(`deletealbum/${albumId}`, window.location.href);
  console.log(url);

  // add event listener to delete button
  const deleteButton = deleteAlbumModal.querySelector('#delete-album-button');
  const deleteAlbum = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const deleteAlbumResponse = await deleteAlbum.json();
  console.log(deleteAlbumResponse);

  deleteButton.addEventListener('click', deleteAlbum);
});
