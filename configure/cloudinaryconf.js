
const cloudinary = require('cloudinary').v2;
  require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.REACT_APP_Cloud_Name ,
    api_key:process.env.REACT_APP_API_key,
    api_secret:process.env.REACT_APP_api_Secret_key
})
module.exports = cloudinary;