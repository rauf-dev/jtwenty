const express = require('express');
const morgan = require('morgan'); // logging
require('dotenv').config();

const connectDb = require('./utils/db/db-connection.js');
// const cldMainFolder = require('./utils/cloudinary/cloudinaryMainFolder.js');

// init app & middleware
const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// ! CHECking if can be deleted
// Run once to create named transformations
// const runOnceCreateNamedTransformations = require('./utils/cloudinary/createNamedTransformations.js');
// runOnceCreateNamedTransformations();

// Server Middleware ################################
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.use(morgan('tiny')); // logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'));

// Import routes
const landingPageRoute = require('./routes/landingPageRoute.js');
const createNewAlbumRoute = require('./routes/createNewAlbumRoute.js');
const deleteAlbumRoute = require('./routes/deleteAlbumRoute.js');
const renameAlbumNameRoute = require('./routes/renameAlbumNameRoute.js');
const albumImagesRoute = require('./routes/albumImagesRoute.js');
const deleteImageRoute = require('./routes/deleteImageRoute.js');
const createNewAlbumPageRoute = require('./routes/createNewAlbumPageRoute.js');
const viewAlbumPageRoute = require('./routes/viewAlbumPageRoute.js');
const uploadWidgetRoute = require('./routes/upload-widget-route.js');
const userSetCoverImageRoute = require('./routes/userSetCoverImageRoute.js');
const lightboxPageRoute = require('./routes/lightboxPageRoute.js');

// Import validation middleware
const validateBody = require('./utils/validation/validation-middleware.js');

// Import validation schemas
const { valNewAlbumNameSchema, valDeleteAlbumSchema, valRenameAlbumSchema } = require('./utils/validation/validationSchema.js');

// Application Routes
app.use('/', landingPageRoute); // Home- start page
app.use('/newalbumpage', createNewAlbumPageRoute);
app.use('/newalbum', validateBody(valNewAlbumNameSchema), createNewAlbumRoute);
app.use('/deletealbum', deleteAlbumRoute);
app.use('/renameAlbum', validateBody(valRenameAlbumSchema), renameAlbumNameRoute);
app.use('/albumimages', albumImagesRoute);
app.use('/deleteimage', deleteImageRoute);
app.use('/viewalbum', viewAlbumPageRoute);
app.use('/upload', uploadWidgetRoute); //signed uploads via cld widget
app.use('/set-cover-image', userSetCoverImageRoute); // set cover image for album
app.use('/lightbox', lightboxPageRoute); // lightbox image gallery

app.listen(PORT, () => console.log(`JTWENTY SERVER on port :${PORT}, GOO!!!!!`));
