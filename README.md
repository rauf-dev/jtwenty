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

## Cloudinary Image Transformations
Create in advance (during upload?) because a: Its possible and b: a noticeable delay when loading images for the first time.
This is because by design, the create new album process is followed by upload images and immediately after upload is completed, page is redirected to view the images.
Named transformations are created by the script /utils/createNamedTransformations.js.

### Improvements
Transformations are not used. All is done via the url in oprtimizations.
Create 3 named transformations as below and then add optimization using url.

1. Landing Page
2. View Album Gallery (Masonry)
3. Slideshow (Large images)

## Cloudinary Image Optimization
Optimizations are quality = auto and delivery format = auto. Can only be done on the fly because are optimized to the user device / browser.

Optimizations are created when uploading new image.
During upload, url is generated adding the optimization and transformation parameters.
The url's are then saved in db along with the image data(masonry_url, landingPage_url, coverImage_url)

### Improvements
See improvements in Cloudinary Image Transformations.

## Set Album Cover Image Logic
Cover image is defined in two places:
1. Initially set when loading the landing page
  - Server side script in landingPageRoute runs:
    - Per album, album has images?
      - NO; set a default coverImage from /public/assets/no-image-available.jpg
      - YES; Album has a coverImage defined? 
        - NO; sets first image in album to be cover image.Save to db.
        - YES; returns that image object.

2. User select different cover image in view album page
   - FE script sends data of clicked radion button to BE.
   - BE saves coverImage to db and returns success to FE.
   - FE toggles all to false and sets clicked one to true

The scripts used are:
db-crud.js => defaultSetCoverImage, userSetCoverImage, resetCoverImage