require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// creating an new named transformation called thumbnail
cloudinary.api
    .create_transformation("thumbnail", {
        crop: "thumb",
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

