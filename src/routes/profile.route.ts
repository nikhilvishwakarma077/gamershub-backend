import express from "express";
import { createProfile, getAllProfiles, getProfileById, myProfile, updateProfile } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", protect, (req, res, next) => {
    console.log("Before Upload");
    next();
}, upload.array("achievementImages"), (req, res, next) => {
    console.log("After Upload");
    next();
}, createProfile);
router.get("/me", protect, myProfile);
router.get("/:id", getProfileById);
router.get("/", getAllProfiles);
router.put("/", protect, upload.array("achievementImages"), updateProfile);

export default router;     