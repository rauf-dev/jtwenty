const cloudName = "dzcyxehoa"; // replace with your own cloud name

// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/product_gallery_reference

const myGallery = cloudinary.galleryWidget({
  container: "#my-gallery",
  cloudName: cloudName,
  mediaAssets: [
    { tag: "shelly beach" }, // by default mediaType: "image"
    // { tag: "electric_car_product_gallery_demo", mediaType: "video" },
    // { tag: "electric_car_360_product_gallery_demo", mediaType: "spin" }
  ],
  // displayProps: { mode: "expanded", columns: 2 }, // multi column display
  // aspectRatio: "4:3", // if most assets are in landscape orientation
  // imageBreakpoint: 200,  // responsive resize images to closest step in 200px increments
  // carouselStyle: "indicators", // displays thumbnails by default
  // indicatorProps: { color: "red" },   // only relevant if CarouselStyle is set to indicators
  // carouselLocation: "right",  // "left" by default
  // borderColor: "red",  // color is transparent by default
  // borderWidth: 5, // border width is 0 by default
  // transition: "fade",  // "slide" by default
  // zoom: false,    // deactivate the zoom feature
});

// When loading is finished, find all links with class "launchGallery", and add a click event listener to each of them.
// When a link is clicked, open the gallery widget.
window.onload = function () {
  const links = document.getElementsByClassName("launchGallery");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      myGallery.render();
    });
  }
};



//myGallery.render();