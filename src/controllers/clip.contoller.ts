import { Request, Response } from "express";
import { Profile } from "../models/profile.model.js";
import { ClipResponse } from "../types/clip.types.js";




export const getAllClips = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const profiles = await Profile.find(
            {
                "clips.0": { $exists: true }
            },
            {
                username: 1,
                avatar: 1,
                role: 1,
                clips: 1
            }
        ).lean();

        if (!profiles.length) {
            res.status(404).json({
                success: false,
                message: "No clips found."
            });
            return;
        }

        const allClips: ClipResponse[] = profiles.flatMap((profile) =>
            profile.clips.map((clip) => ({
                clipId: clip._id,
                profileId: profile._id,

                title: clip.title,
                clipUrl: clip.clipUrl,
                uploadedAt: clip.uploadedAt,

                username: profile.username,
                avatar: profile.avatar,
                role: profile.role,

            }))
        );

        res.status(200).json({
            success: true,
            message: "Clips fetched successfully.",
            total: allClips.length,
            data: allClips
        });
    } catch (error) {
        console.error("Error fetching clips:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching clips."
        });
    }
};