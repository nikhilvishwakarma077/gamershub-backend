import multer from "multer";
import dotenv from 'dotenv';
dotenv.config()
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "gamershub/achievements",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    } as any,
});

export const upload = multer({ storage });