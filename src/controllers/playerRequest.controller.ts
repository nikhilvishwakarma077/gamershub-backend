import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { PlayerRequest } from "../models/playerRequest.model.js";
import { Profile } from "../models/profile.model.js";

export const createPlayerRequest = async (req: AuthRequest,res: Response) => { 

    try {

        const userId = req.user?.id;

        const {
            role,
            joiningType,
            activeTime,
            languagesComfortable,
            instagram,
            expiresAt
        } = req.body;

        if (
            !role ||
            !joiningType ||
            !activeTime ||
            !instagram ||
            !expiresAt
        ) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const profile = await Profile.findOne({
            userId
        });

        // PROFILE NOT CREATED
        if (!profile) {
            return res.status(400).json({
                success: false,

                message:
                    "Create your gamer profile before posting player requests"
            });
        }

        // create request
        const playerRequest = await PlayerRequest.create({

            userId,
            profileId: profile._id,
            role,
            joiningType,
            activeTime,
            languagesComfortable,
            instagram,
            expiresAt
        });

        return res.status(201).json({
            message: "Player request created successfully",
            playerRequest
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getAllPlayerRequests = async (req: Request,res: Response) => {

    try {

        const playerRequests = await PlayerRequest
            .find()
            .populate("userId", "username email")
            .populate("profileId", "username avatar")
            .sort({ createdAt: -1 });
        

        return res.status(200).json({

            message: "Player requests fetched successfully",
            totalRequests: playerRequests.length,
            playerRequests
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        }); 
    }
};

export const getMyPlayerRequests = async (req: AuthRequest,res: Response) => {

    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const myPlayerRequests = await PlayerRequest.find({ userId })
            .sort({ createdAt: -1 })
            .populate('userId', 'username');  

        return res.status(200).json({
            message: "My Player Requests Fetched Successfully",
            playerRequests: myPlayerRequests
        }); 

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const deletePlayerRequestById = async (req: AuthRequest,res: Response) => {

    try {

        const userId = req.user?._id;

        const {id} = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const playerRequest = await PlayerRequest.findById(id);

        if (!playerRequest) {
            return res.status(404).json({
                message: "Player Request Not Found"
            });
        }

        if (playerRequest.userId.toString() !== userId.toString()) {

            return res.status(403).json({
                message: "Access Denied"
            });
        }

        await PlayerRequest.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Player Request Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};