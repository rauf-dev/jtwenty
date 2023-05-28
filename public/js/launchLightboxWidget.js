const albumName = document.getElementById('title').innerHTML;
console.log('albumName: ', albumName);

// Init the gallery widget
const cloudName = 'dzcyxehoa';
const myGallery = cloudinary.galleryWidget({
  container: '#lightbox-widget',
  cloudName: cloudName,
  carouselStyle: "indicators",
  carouselLocation: "bottom",
  loaderStyle: "circle",
  indicatorProps: {
    // color: "#FFFF00",
    selectedColor: "#FFFF00",
  },
  mediaAssets: [{ tag: albumName }],
});

// Render the gallery widget
myGallery.render();

// Important
// To avoid memory leaks and performance issues, make sure to use the destroy method before removing the Product Gallery widget container element from your DOM.
