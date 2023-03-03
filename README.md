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
- [ ]  Enter album name in front end
  - [ ]  Verify if name already exists in DB
  - [ ]  Create folder in Cloudinary
  - [ ]  Use Cld response to save album name in DB
- [ ]  Redirect to view album page



### View Album Page
- [ ]  GET All Images in Album
- [ ]  POST Delete Image(s) 
- [ ]  Rename Album Name
  - [ ]  Validate id
  - [ ]  Validate name

### Upload Images Page
- [ ]  Cloudinary Upload Widget to upload one image
- [ ]  Use response data to save image data to DB