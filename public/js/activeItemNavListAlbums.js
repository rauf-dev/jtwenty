window.addEventListener('DOMContentLoaded', async (event) => {
  // get the current url path to determine which page we are on
  const currentPath = window.location.pathname.split('/');

  // get the last word in the path
  let albumId = currentPath[currentPath.length - 1];
  console.log(albumId);

  const currentAlbumId = `link${albumId}`;

  // get the link element with the id of the current album
  const currentAlbumLink = document.getElementById(currentAlbumId);

  // add the active class to the current album link
  currentAlbumLink.classList.add('active');

  // add the active-list-item class to list item for css styling
  currentAlbumLink.parentNode.parentNode.classList.add('active-listitem-albumName');
  currentAlbumLink.parentNode.parentNode.parentNode.classList.add('active-listitem');
});
