# jtwenty

# TO DO's   

## DB CRUDs

### NAVBAR (All pages)
- [x] GET  All Album names, path and count of images inside
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
- [x]  Cloudinary Upload Widget to upload one orseveral images
  - [x]  Use response data to save image data to DB
- [x]  Redirect to view album page



### View Album Page
- [x]  GET All Images in Album
- [x]  POST Delete Image(s) 
- [ ]  Rename Album Name (Not implemented)
  - [ ]  Validate id
  - [ ]  Validate name


# Documentation
## General
Front end is build on vanilla javascript and EJS templating.
Backend is Node.js / Express.
Images are saved in Cloudinary library via API's.
Data is saved in a local MongoDB via mongoose driver/Schema.

Motto is that the Mongo DB is king. Nothing is saved or deleted from db unless all prior actions are successful. The front end reads only data from db.

User makes a change -> Change reflected in Cloudinary --> Change reflected to db.

## Components
The app has three main components.
1. NavBar Menu, visible on all pages.
2. Landing Page, shows cards of existing albums.
3. View Album Page, shows images inside the album in a masonry layout (resize window to see the magic).

### 1.Navbar
The navbar menu is the heart of this app. Almost all actions can be done here.

| Action                         | NavBar Menu all pages | Landing Page Cards | ViewAlbum Page |
|--------------------------------|:---------------------:|:------------------:|:--------------:|
| List of albums                 |           x           |          x         |                |
| Count of images inside album   |           x           |          x         |                |
| Click album name to view album |           x           |          x         |                |
| Create new album               |           x           |                    |                |
| Upload image(s)                |           x           |                    |                |
| Delete album                   |           x           |                    |                |
| Delete image                   |                       |                    |        x       |
| User set album cover image     |                       |                    |        x       |

### 2. Landing Page
- Shows cards of existing albums.
- Each Card is clickable to go to particular view album page.
- Each card consists of only the album cover image.
  - Name of album is overlayed onto cover image using cloudinary text transformation.
  - Count of images inside album is overlayed using css properties

### 3. View Album Page
- Shows all images inside album in a beuatiful masonry layout (resize window to see the magic).
- Each image has a radio button to set as album cover image.
- Each image has a button to delete it.
- Each image is clickable to open full size image.
- TO DO -> CREATE TRANSFORMATION FOR LARGE IMAGE <-- TO DO
- TO DO -> CREATE GALLERY <-- TO DO

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


# Quick notes
