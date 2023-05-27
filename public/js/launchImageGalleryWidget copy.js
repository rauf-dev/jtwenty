window.addEventListener('load', () => {
  const initializeModal = () => {
    const imageGalleryModal = document.getElementById('product-gallery-modal');

    imageGalleryModal.addEventListener('show.bs.modal', (event) => {
      event.preventDefault();
      // Button that triggered the modal, retrieves the data-bs-* attributes from it
      const button = event.relatedTarget;

      // Extract info from data-bs-* attributes
      const albumName = button.getAttribute('data-bs-albumname');

      

      // Init the gallery widget
      const cloudName = 'dzcyxehoa';
      const myGallery = cloudinary.galleryWidget({
        container: '#my-gallery',
        cloudName: cloudName,
        mediaAssets: [{ tag: albumName }],
      });

      // Render the gallery widget
      myGallery.render();
    });
  };

  // Check if the element is already in the DOM
  const imageGalleryModal = document.getElementById('product-gallery-modal');
  if (imageGalleryModal) {
    initializeModal();
  } else {
    // Wait for the element to be added to the DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0];
          if (addedNode.id === 'product-gallery-modal') {
            observer.disconnect();
            initializeModal();
            break;
          }
        }
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
});


// #############################################

// window.addEventListener('load', () => {
//   const imageGalleryModal = document.getElementById('product-gallery-modal');

//   imageGalleryModal.addEventListener('show.bs.modal', (event) => {
//     event.preventDefault();
//     // Button that triggered the modal, retrieves the data-bs-* attributes from it
//     const button = event.relatedTarget;

//     // Extract info from data-bs-* attributes
//     const albumName = button.getAttribute('data-bs-albumname');

//     // Init the gallery widget
//     const cloudName = 'dzcyxehoa';
//     const myGallery = cloudinary.galleryWidget({
//       container: '#my-gallery',
//       cloudName: cloudName,
//       mediaAssets: [{ tag: albumName }],
//     });

//     // Render the gallery widget
//     myGallery.render();
//   });
// });