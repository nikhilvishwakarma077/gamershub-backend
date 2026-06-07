import { Request, Response } from "express";
import { Profile } from "../models/profile.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";



export const createProfile = async (req: AuthRequest, res: Response) => {

    try {

        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const {
            username,
            uid,
            age,
            avatar,
            banner,
            bio,
            country,
            languages,
            role,
            socialLinks,
            stats,
            experience,
            availability,
            clips,
            achievements,
            teamHistory,
        } = req.body;

        if (
            !username ||
            !uid ||
            !age ||
            !country ||
            !role ||
            !socialLinks.instagram
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }
        if (typeof username !== "string") {
            return res.status(400).json({
                success: false,
                message: "Username must be string",
            });
        }

        if (typeof uid !== "number") {
            return res.status(400).json({
                success: false,
                message: "UID must be number",
            });
        }

        if (typeof age !== "number") {
            return res.status(400).json({
                success: false,
                message: "Age must be number",
            });
        }

        if (!Array.isArray(languages)) {
            return res.status(400).json({
                success: false,
                message: "Languages must be array",
            });
        }


        if (
            socialLinks?.instagram !== undefined &&
            typeof socialLinks.instagram !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Instagram link must be a string",
            });
        }

        if (
            socialLinks?.discord !== undefined &&
            typeof socialLinks.discord !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Discord link must be a string",
            });
        }

        if (
            !socialLinks ||
            (
                !socialLinks.instagram?.trim() &&
                !socialLinks.discord?.trim()
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "At least one social link (Instagram or Discord) is required",
            });
        }

        const allowedAvailability = [
            "looking for team",
            "open for scrims",
            "already in team",
        ];

        if (
            availability?.status &&
            !allowedAvailability.includes(
                availability.status
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid availability status",
            });
        }


        const existingProfile =
            await Profile.findOne({
                userId,
            });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists",
            });
        }

        const profile = await Profile.create({

            userId,
            username,
            uid,
            age,
            avatar,
            banner,
            bio,
            country,
            languages,
            role,
            socialLinks: {
                instagram: socialLinks?.instagram || "",
                discord: socialLinks?.discord || "",
            },

            stats: {
                currentRank:stats?.currentRank || "",
                kdRatio:stats?.kdRatio || 0,
                headshotPercentage:stats?.headshotPercentage || 0,
            },

            experience: {
                level:experience?.level || 1,
                yearsPlaying:experience?.yearsPlaying || 0,
                esportsExperience:experience?.esportsExperience || 0,
            },

            availability: {
                status:availability?.status ||"looking for team",
            },

            clips:
                clips?.map((clip: any) => ({
                    title:clip.title || "",
                    clipUrl: clip.clipUrl || "",
                    thumbnailUrl:clip.thumbnailUrl || "",
                })) || [],

            achievements:
                achievements?.map(
                    (achievement: any) => ({
                        title:achievement.title || "",
                        image:achievement.image || "",
                    })
                ) || [],

            teamHistory:
                teamHistory?.map((team: any) => ({
                    teamName:
                        team.teamName || "",
                    role:
                        team.role || "",
                    duration:
                        team.duration || "",
                })) || [],
            profileCompleted: true,
        });

        return res.status(201).json({
            success: true,
            message:"Profile created successfully",
            data: profile,
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const myProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }


        const myProfile = await Profile.findOne({ userId });

        if (!myProfile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            profile: myProfile,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getProfileById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const profile = await Profile.findById(id)
            .populate("userId", "name email");

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        return res.status(200).json({
            profile
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};


export const getAllProfiles = async (req: Request, res: Response) => {

    try {

        const profiles = await Profile.find()
            .select('username uid role avatar country languages experience availability')
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            total: profiles.length,
            profiles
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {

    try {

        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        const updateData = req.body;

        const profile = await Profile.findOne({ userId });


        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const updatedProfile = await Profile.findOneAndUpdate(

            { userId },

            {
                $set: updateData
            },

            {
                new: true,
                runValidators: true
            }
        );


        const isCompleted =
            updatedProfile?.avatar &&
            updatedProfile?.bio &&
            updatedProfile?.country &&
            updatedProfile?.role;


        if (isCompleted) {
            updatedProfile.profileCompleted = true;
            await updatedProfile.save();
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            updatedProfile
        });



    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
}