import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import profileRoutes from "./routes/profile.route.js"
import playerRequestRoutes from "./routes/playerRequest.route.js"
import { protect } from "./middlewares/auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express()
app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://gamershub-frontend-two.vercel.app",
        ],
        credentials: true,
    })
);

connectDB()


app.get("/", protect, (req, res) => {
    res.json({
        message: "API Running"
    });
});


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/player-requests", playerRequestRoutes);

export default app; 