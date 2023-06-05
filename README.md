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
## Why and what is this app about?
This app was created primariry as a learning project for hands on implementations of a CRUD application using Javascript.

So, the app allows one to create named photo album(s) and upload images to respective album. 
Each album gets a cover image assigned which the user can change to personal preference.
Images inside album can be viewed in masonry style layout or in a lightbox gallery.
Single images can be deleted.
Album can be deleted (Regardless if empty or not, a warning will appear).

## Tech Stack
### Backend
- Backend runs on [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/) used for storage of images.
- Uploading of images using signed uploads method of [Cloudinary upload widget](https://cloudinary.com/documentation/upload_widget#signed_uploads).
- Image transformations using Cloudinary SDK for Node.js [direct URL building](https://cloudinary.com/documentation/node_image_manipulation#direct_url_building) helper method.
- Cloud hosted [MongoDB Atlas](https://www.mongodb.com/atlas) as database for all image and album data. DB is the single point of truth.

### Frontend
- Frontend uses [vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript), [EJS Embedded Javascript Templating](https://ejs.co/) and [Bootstrap](https://getbootstrap.com/) 
- Masonry layout in view album page achieved using [desandro Masonry](https://masonry.desandro.com/) inside bootstrap
- Live rearranging (in view album page) of images in masonry layout while resizing browser window achieved using [desandro imagesLoaded](https://imagesloaded.desandro.com/)
- Text animations (annotations) in landing page achieved using [Rough Notation](https://roughnotation.com/). 
- Fully responsove layout.
- Images auto-resized and auto-image format delivered based on clients device and screen size.

## What was most challenging?
### Upload and delivery of images. 
- Vanilla JS file upload with thumbnail preview had issues on the Safari browser in mobile devices.
- Typical user uploaded images (from mobile phones) are way too large in capacity and dimensions to display in front-end. Experiamented with image optimization services like [ImageKit](https://imagekit.io/) and [Cloudinary](https://cloudinary.com/). Personally preferred ImageKit for ease of use and simpler pricing model, but went ahead with Cloudinary as it is more suited for business purposes and wouldnt hurt to be familiar with. 
### Mongoose vs MongoDB driver
In retrospect could just have used native MongoDB driver but initially over estimated complexity to list count of images per album in the navbar. Thought process was to use Mongoose model virtuals and hence reduce load times as navbar is loaded in each page. Ended up not using the model virtuals as count of images is dynamic and needs to be constantly updated when image(s) deleted or added.
### Design of Frontend
What can I say, more fun getting backend and API's to wok than designing the site. Definately needs improvement.

## Lessons Learnt
To my surprise I found I actually enjoy Javascript, Node.js now. Implementing and solving API issues.

### Planning before coding
- Initially started coding with a rough design of the app workflow. This was counterproductive as had to greenfield restart several times due to unconsedered aspects.
- Then took time to thorougly create a detailled workflow documentaion and layout design in Figma. This was good but also counterproductive as so much changed during the implementation that it was near impossible to keep the now existing diagrams and documentation updated with the code implemented.

So my conclusion is: 
  - If its an app (or tech stack) that you're very familiar with, sure go ahead and create detailled app workflow diagrams. 
  - Else, create a 'big picture' workflow
    - Get backend up and running
    - Use postman etc to create the APIs with response needed
    - Work on the front end design.

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
- If no albums exist, shows text with animation to create album.
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


# Quick notes/ future to-do's
- create named transformations
- remove console.log's
- delete unused files
