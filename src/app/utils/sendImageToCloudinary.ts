/* eslint-disable no-console */
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
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
): Promise<UploadApiResponse | undefined> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    return uploadResult as UploadApiResponse;
  } catch (error) {
    console.log("Cloudinary upload failed:", error);
    return undefined;
  } finally {
    fs.unlink(path, (err) => {
      if (err) {
        console.log("Failed to delete local file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });
  }
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
