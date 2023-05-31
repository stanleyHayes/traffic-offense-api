import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {PORT, NODE_ENV, MONGODB_URI, JWT_SECRET, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET};