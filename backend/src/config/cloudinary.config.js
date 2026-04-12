const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Portfolio-Images",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// multer middleware
const upload = multer({ storage });

module.exports = upload;