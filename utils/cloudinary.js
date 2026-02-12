import { v2 as cloudinary } from "cloudinary";
import e from "./error.js";
import { config } from "../config/environment.js";

 

// cloudinary config settings
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

// uploading images
const uploadImage = async (
  next,
  file_path,
  folder,
  width,
  height,
  crop,
  quality,
  type,
) => {
  return await cloudinary.uploader.upload(
    file_path,
    {
      folder,
      resource_type: type,
      width,
      height,
      crop,
      quality,
    },
    (err) => {
      if (err) return next(e(400, "Picture could not upload to cloud!"));
    },
  );
};

export default uploadImage;
