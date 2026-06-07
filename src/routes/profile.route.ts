import express from "express";
import { createProfile, getAllProfiles, getProfileById, myProfile, updateProfile } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",protect, createProfile);
router.get("/me",protect, myProfile);
router.get("/:id", getProfileById);
router.get("/", getAllProfiles);
router.put("/",protect, updateProfile); 

export default router;     