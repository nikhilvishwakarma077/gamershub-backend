import express from "express";
import { getAllClips } from "../controllers/clip.contoller.js";

const router = express.Router();

router.get("/", getAllClips);

export default router;