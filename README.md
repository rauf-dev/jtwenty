<h1 align="center">Welcome to jtwenty 👋</h1>


- [What is jtwenty?](#what-is-jtwenty)
- [Why jtwenty?](#why-jtwenty)
- [Homepage and Screenshots](#homepage-and-screenshots)
    - [✨ Visit jtwenty](#-visit-jtwenty)
- [Features](#features)
- [Technologies used](#technologies-used)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Deployment](#deployment)
- [Components](#components)
  - [Welcome Page](#welcome-page)
  - [Navbar](#navbar)
  - [Landing Page](#landing-page)
  - [View Album Page](#view-album-page)
  - [Lightbox Page](#lightbox-page)
- [How To Install and Run Locally](#how-to-install-and-run-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [What was most challenging?](#what-was-most-challenging)
  - [Upload and delivery of images.](#upload-and-delivery-of-images)
  - [Mongoose vs MongoDB driver](#mongoose-vs-mongodb-driver)
  - [Design of Frontend](#design-of-frontend)
- [Lessons Learnt](#lessons-learnt)
  - [Planning before coding](#planning-before-coding)
- [Author](#author)
- [📝 License](#-license)

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/rauf-dev/jtwenty#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/rauf-dev/jtwenty/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/rauf-dev/jtwenty/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/rauf-dev/jtwenty" />
  </a>
</p>



# What is jtwenty?
jtwenty is a powerful but simple to use web app for organizing photos in albums. Fast, beautiful and optimized viewing per device. Uploaded photos are automatically resized and optimised. Intuitive single-point-of-action menu navigation for creating and managing albums and images.


# Why jtwenty?
jtwenty is a full-stack web app that was born out of my journey to learn AWS. With no prior coding experience, I recognized the value of coding skills and embarked on a mission to learn JavaScript. As a result, jtwenty has evolved from a static photo-website in different variations, including an excursion into WordPress, to a full stack web app. This remains a work in progress and will be updated as I learn new things. Every day is a learning day.




# Homepage and Screenshots

### ✨ [Visit jtwenty](https://jtwenty.rlieberg.com)
[jtwenty.rlieberg.com](https://jtwenty.rlieberg.com) 

Insert gif(s) here

# Features
- Create albums
- Upload images to albums
- Set album cover image
- Delete albums
- Delete images
- View images in album

# Technologies used

<p>
  <a href="https://nodejs.org/"><img alt="Node.js" src="https://img.shields.io/badge/-Node.js-green?style=flat&logo=node.js&logoColor=white"></a>
  <a href="https://expressjs.com/"><img alt="Express.js" src="https://img.shields.io/badge/-Express.js-lightgrey?style=flat&logo=express&logoColor=white"></a>
  <a href="https://www.javascript.com/"><img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-yellow?style=flat&logo=javascript&logoColor=white"></a>
  <a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-green?style=flat&logo=mongodb&logoColor=white"></a>
  <a href="https://mongoosejs.com/"><img alt="Mongoosejs.com" src="https://img.shields.io/badge/-Mongoose.js-lightred?style=flat&logo=mongoose&logoColor=white"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img alt="HTML" src="https://img.shields.io/badge/-HTML-orange?style=flat&logo=html5&logoColor=white"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img alt="CSS" src="https://img.shields.io/badge/-CSS-blue?style=flat&logo=css3&logoColor=white"></a>
  <a href="https://ejs.co/"><img alt="EJS" src="https://img.shields.io/badge/-EJS-red?style=flat&logo=ejs&logoColor=white"></a>
</p>



## Backend
- Backend runs on [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/) (free tier) used for storage of images.
- Uploading of images using signed-uploads method of [Cloudinary upload widget](https://cloudinary.com/documentation/upload_widget#signed_uploads).
- Image transformations using Cloudinary SDK for Node.js [direct URL building](https://cloudinary.com/documentation/node_image_manipulation#direct_url_building) helper method.
- Cloud hosted [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) as database for all image and album data. DB is the single point of truth.

## Frontend
- Frontend uses [vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript), [EJS Embedded Javascript Templating](https://ejs.co/) and [Bootstrap](https://getbootstrap.com/) 
- Masonry layout in view album page achieved using [desandro Masonry](https://masonry.desandro.com/) inside bootstrap
- Live rearranging (in view album page) of images in masonry layout while resizing browser window achieved using [desandro imagesLoaded](https://imagesloaded.desandro.com/)
- Text animations (annotations) in landing page achieved using [Rough Notation](https://roughnotation.com/). 
- Fully responsove layout.
- Images auto-resized and image-auto format delivered based on clients device and screen size.
- Carousel uses [Cloudinary Product Gallery widget](https://cloudinary.com/documentation/product_gallery_reference)

## Deployment
App is hosted in AWS using [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) on custom domain with ssl.

# Components
The app has four main components.
1. Welcome page, only shown when no albums exist.
2. NavBar Menu, visible on all pages.
3. Landing Page, shows cards of existing albums.
4. View Album Page, shows images inside the album in a masonry layout (resize window to see the magic).

## Welcome Page
- This is the first page that shows when the app is opened. Contains a short description of the app and an action prompt button to create first album. After an album is created, this page is not shown again.

## Navbar
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

## Landing Page
- If no albums exist the 'welcome page' is shown instead.
- Landing page shows existing albums displayed as cards.
- The album cards show the album cover image, the name of the album and count of images inside album.
  - Each Card is clickable to go to particular view album page.
  - Album name is overlayed using cloudinary text transformation.
  - Count of images inside album is overlayed using EJS and CSS.
  - Cover image is by default the first image uploaded to the album. User can change this by clicking the radio button on the image in the view album page.
 

## View Album Page
- Shows all images inside album in a beautiful masonry layout (resize window to see the magic).
- Each image has a radio button to set as album cover image.
- Each image has a button to delete it.
- Each image is clickable to open full size image.
- Each image has a caption overlayed using cloudinary text transformation.

## Lightbox Page
- Shows a carousel of the images inside the album using [Cloudinary Product Gallery widget](https://cloudinary.com/documentation/product_gallery_reference).



# How To Install and Run Locally
## Prerequisites
- Install [Node.js](https://nodejs.org/en/download/)
- Create a free tier account with [Cloudinary](https://cloudinary.com/).
  - Make the following settings:
    - In Cloudinary media library, create a folder that will contain all your images. This folder name will be used as the value for the variable 'cldMainFolder' in /utils/cloudinary/cloudinaryMainFolder.js.
    - setting 1
    - setting 2
  - Make a note of your cloud name, API key and API secret which you will need to set up your environment variables.
- Create a free tier account with [MongoDB Atlas](https://www.mongodb.com/atlas). 
  - Make the following settings:
    - Create a cluster and a database. Make a note of the database name and collection name which you will need to set up your environment variables.
    - Network Access: Allow access from your local IP address.

## Installation
Clone this repository and install dependencies.
```sh	
git clone https://github.com/rauf-dev/jtwenty.git
```

```sh
npm install
```
Create a .env file in the root directory and set the following environment variables:
```sh
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URI=your_database_uri_more_info_from_mongodb_atlas_under_connection_string
```


## Usage

To run the app locally, run the following command in the root directory:
```sh
npm run start
```
In your browser, go to http://localhost:3000

Use the menu to create or delete albums, upload images and view albums.

# What was most challenging?
## Upload and delivery of images. 
- Implementing a vanilla JS file upload with thumbnail preview had compatibility issues on the Safari browser in mobile devices.
- Dealing with typical user-uploaded images from mobile phones that were large in file size and dimensions posed challenges for displaying them in the front-end. Explored image optimization services like [ImageKit](https://imagekit.io/) and [Cloudinary](https://cloudinary.com/). While personally preferring ImageKit for its ease of use and simpler pricing model, I ultimately chose Cloudinary as it aligns better with business requirements and provided an opportunity to gain familiarity with it.
- Cloudinary's [upload widget](https://cloudinary.com/documentation/upload_widget#signed_uploads) was used to upload images. The widget provides a signed upload method which allows for direct upload from the browser to Cloudinary without the need to go through the backend. This is a more secure method as the upload signature is generated on the backend and passed to the frontend. The widget also provides a thumbnail preview of the image before upload. 
  
## Mongoose vs MongoDB driver
In hindsight, using the native MongoDB driver would have sufficed. Initially, I overestimated the complexity of listing the count of images per album in the navbar. I considered utilizing Mongoose model virtuals to reduce load times, as the navbar is loaded on each page. However, since the count of images is dynamic and needs to be constantly updated when image(s) are added or deleted, the model virtuals approach was not practical.

## Design of Frontend
While I found more enjoyment in getting the backend and APIs to work, the design of the frontend still requires improvement. It is an area where I acknowledge the need for further development and enhancement.

# Lessons Learnt
To my surprise (that is after overcoming the [valley of despair](https://yarocruz.github.io/the-valley-of-despair/)), I discovered a genuine enjoyment for JavaScript and Node.js during the process of implementing and resolving API issues.

## Planning before coding
- Initially started coding with a rough design of the app workflow. This was counterproductive as had to greenfield restart several times due to unconsedered aspects.
- Then took time to thorougly create a detailled workflow documentaion and layout design in Figma. This was good but also counterproductive as so much changed during the implementation that it was near impossible to keep the now existing diagrams and documentation updated with the code implemented.

So my conclusion is: 
  - If its an app (or tech stack) that you're very familiar with, sure go ahead and create detailled app workflow diagrams. Otherwise start with a 'big picture' workflow diagram and then start coding and improving the workflow as you go along.

# Author

👤 **Rauf Lieberg**

* Website: Rauf Lieberg
* Github: [@rauf-dev](https://github.com/rauf-dev)

# 📝 License

Copyright © 2023 [Rauf Lieberg](https://github.com/rauf-dev).<br />
This project is [ISC](https://github.com/rauf-dev/jtwenty/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_