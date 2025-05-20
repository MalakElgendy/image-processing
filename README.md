# Image Processing API with Node.js, Express, and TypeScript Overview:-

### this project is backend API build with Node.js,Express,Typescript,Multer,Sharp that allows user to:

1. upload .jpg only images\
2. resize image and download it\
3. view uploaded images in gallery\

---

## More into project :
 Uploading images requires .jpg files can be uploaded by multer with file validation\

 Resizing images resized images can be downloaded locally with specified width and height\

 Error handling with try and catch or if conditions\

 Testing with jasmine to test API endpoints and functions\

 Typescript to write the whole code which will be translated to javascript using <npm run build>\

 Eslint and prettier to make sure the code is formatted\ 

 Front-end to display the gallery and allows the user to interact with various choices\

## To download :

### Prerequisites:
1. node.js(>= 14.x) &i recommend using 20.11.1&\

2. npm\

## Installation via Githup :
 git clone https://github.com/MalakElgendy/image-processing.git\
 cd image-processing\

## Instal dependencies
 npm install\
 npm install node_modules(in case if its removed)\
 The server will start on http://localhost:3000 by default.\

---

## Available scripts

```npm run start``` <run the compiled js server>

```npm run build``` <compile ts to js>

```npm run dev``` <run nodemon>

```npm run test``` <run jasmine tests>

```npm run lint``` <run eslint checks>

```npm run prettier``` <to fix the format>

---

## Api endpoints

1. upload image
Url:/api/upload\
Method:post\
Description:upload a .jpg image file\

2. resize image
Url:/api/resize\
Method:get\
Description:user needs to write width and height \

3. List Available Images
Url: /api/images\
Method: GET\
Description: Returns a JSON array of all uploaded images available for processing.\

---

## Development notes:
* typescript is in src/ and compiled to build/
* uploaded images are saved in /uploads which is also the same folder used to display the gallery
* front-end (html) are served from /front-end 
