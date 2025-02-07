/* eslint-disable no-console */
import { v2 as cloudinary, UploadApiErrorResponse } from "cloudinary";
import config from "../config";
import fs from "fs";
import multer from "multer";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<UploadApiErrorResponse | undefined> => {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });

  if (uploadResult) {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted");
      }
    });
  }

  return uploadResult as UploadApiErrorResponse | undefined;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
