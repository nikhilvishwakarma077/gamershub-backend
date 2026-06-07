import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest,res: Response,next: NextFunction) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }

    
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) as { id: string };

        const user = await User.findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error)
    }
};

export const admin = (req: AuthRequest,res: Response,next: NextFunction) => {

   
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authorized",
        });
    }


    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Admin access only",
        });
    }

    next();
};