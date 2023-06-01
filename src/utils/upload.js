import cloudinary from "cloudinary";
import {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from "./../config/config.js";


cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

cloudinary.config({
    secure: true
});

const uploadImage = async (path, options) => {
    try{
        const {public_id, secure_url, resource_type, bytes, format, width, height} = await cloudinary.v2.uploader.upload(path, options);
        return {
            success: true,
            data: {public_id, secure_url, resource_type, bytes, format, width, height}
        }
    }catch (e) {

        console.log(
            e.message
        )
        return {
            success: false,
            data: null,
            message: e.message
        }
    }
}

export {uploadImage};