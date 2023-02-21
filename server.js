const express = require('express');
const morgan = require('morgan');
const saveNewAlbum = require('./utils/db/db-crud.js');
require('dotenv').config();

const connectDb = require('./utils/db/db-connection.js');

// init app & middleware
const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// Server Middleware ################################
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'));

// Import routes
const landingPageRoute = require('./routes/landingPageRoute.js');
const createNewAlbumRoute = require('./routes/createNewAlbumRoute.js');
const deleteAlbumRoute = require('./routes/deleteAlbumRoute.js');
const renameAlbumNameRoute = require('./routes/renameAlbumNameRoute.js')
const addImageToDbRoute = require('./routes/addImageToDbRoute.js')

// Application Routes
app.use('/', landingPageRoute); // Home- start page
app.use('/newalbum', createNewAlbumRoute);
app.use('/deletealbum', deleteAlbumRoute);
app.use('/renameAlbum', renameAlbumNameRoute);
app.use('/uploadimage', addImageToDbRoute);

app.listen(PORT, () => console.log(`JTWENTY SERVER on port :${PORT}, GOO!!!!!`));
