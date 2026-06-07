import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createPlayerRequest, deletePlayerRequestById, getAllPlayerRequests, getMyPlayerRequests } from "../controllers/playerRequest.controller.js";


const router = express.Router();

router.post("/",protect, createPlayerRequest);
router.get("/", getAllPlayerRequests);
router.get("/my-player-requests",protect, getMyPlayerRequests);
router.delete("/:id",protect, deletePlayerRequestById);



export default router;