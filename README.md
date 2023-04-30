# jtwenty
my albums 3

# TO DO   

## DB CRUDs

### NAVBAR (All pages)
- [x] GET All Album names, path and count of images inside
- [x]  POST Save New Album Name
  - [x]  Validata name and path from front end
  - [x]  Function to check if album name exists
- [x]  POST Delete Album
  - [x]  Validate id

### View Album Page
- [x]  GET All Images in Album
- [x]  POST Delete Image(s) 
- [x]  Rename Album Name
  - [x]  Validate id
  - [x]  Validate name

### Upload Images Page
- [x]  POST Add Images to Album

## DB and Cloudinary CRUDS Combined
### NAVBAR (All pages)
Create New Album
- [x]  Enter album name in front end
  - [x]  Verify if name already exists in DB
  - [x]  Create folder in Cloudinary
  - [x]  Use Cld response to save album name in DB
- [x]  Redirect to view album page



### View Album Page
- [x]  GET All Images in Album
- [x]  POST Delete Image(s) 
- [ ]  Rename Album Name
  - [ ]  Validate id
  - [ ]  Validate name

### Upload Images Page
- [x]  Cloudinary Upload Widget to upload one orseveral images
- [x]  Use response data to save image data to DB


# Documentation

## Cloudinary

## Determine Optimal Image Dimensions
Samsung Galaxy Landscape: 4032 x 2268 ~ 3MB
Samsung Galaxy Portrait: 2268 x 4032 ~3MB

Optimum max width 1200px
Optimum max height 550px

### Transformations
Create in advance (during upload?) because a: Its possible and b: a noticeable delay when loading images for the first time.
This is because by design, the create new album process is followed by upload images and immediately after upload is completed, page is redirected to view the images.
Named transformations are created by the script /utils/createNamedTransformations.js.

For the album images page, the transformation `{crop: "thumb"}` delivers a lower resolution image, but still too large. Needs to be chained together with optimization.

When viewing single large image (e.g. slideshow), a different 

### Optimization
Optimizations are quality = auto and delivery format = auto. Can only be done on the fly because are optimized to the user device / browser.

