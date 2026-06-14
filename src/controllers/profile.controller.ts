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

        const existingProfile =
            await Profile.findOne({ userId });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists",
            });
        }

        const { username, avatar, banner, bio, country, role } = req.body;

        const uid = Number(req.body.uid);
        const age = Number(req.body.age);

        const languages = req.body.languages ? JSON.parse(req.body.languages) : [];

        const socialLinks = req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {};

        const stats = req.body.stats ? JSON.parse(req.body.stats) : {};

        const experience = req.body.experience ? JSON.parse(req.body.experience) : {};

        const availability = req.body.availability ? JSON.parse(req.body.availability) : {};

        const clips = req.body.clips ? JSON.parse(req.body.clips) : [];

        const achievements = req.body.achievements ? JSON.parse(req.body.achievements) : [];

        const teamHistory = req.body.teamHistory ? JSON.parse(req.body.teamHistory) : [];


        stats.kdRatio = Number(stats.kdRatio);

        stats.headshotPercentage = Number(stats.headshotPercentage);

        experience.level = Number(experience.level);

        experience.yearsPlaying = Number(experience.yearsPlaying);

        experience.esportsExperience = Number(experience.esportsExperience);


        if (
            !username?.trim() ||
            !uid ||
            !country?.trim() ||
            !role?.trim() ||
            !socialLinks?.instagram?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }



        if (!Array.isArray(languages)) {
            return res.status(400).json({
                success: false,
                message: "Languages must be array",
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



        const uploadedImages =
            (req.files as Express.Multer.File[]) || [];

        const mappedAchievements =
            achievements?.map(
                (achievement: any, index: number) => ({
                    title: achievement?.title.trim() || "",
                    image:
                        uploadedImages[index]?.path || "",
                })
            ) || [];



        const profile = await Profile.create({
            userId,

            username: username.trim(),
            uid,
            age,
            avatar,
            banner,
            bio,
            country: country.trim(),
            role,
            languages,

            socialLinks: {
                instagram: socialLinks?.instagram || "",
                discord: socialLinks?.discord || "",
            },

            stats: {
                currentRank: stats?.currentRank || "",
                kdRatio: Number(stats?.kdRatio) || 0,
                headshotPercentage: Number(stats?.headshotPercentage) || 0,
            },

            experience: {
                level: Number(experience?.level) || 1,
                yearsPlaying: Number(experience?.yearsPlaying) || 0,
                esportsExperience: Number(experience?.esportsExperience) || 0,
            },

            availability: {
                status: availability?.status || "looking for team"
            },

            clips:
                clips?.map(
                    (clip: any) => ({
                        title: clip?.title || "",
                        clipUrl: clip?.clipUrl || "",
                    })
                ) || [],

            achievements: mappedAchievements,

            teamHistory:
                teamHistory?.map(
                    (team: any) => ({
                        teamName: team?.teamName || "",
                        role: team?.role || "",
                        duration: team?.duration || "",
                    })
                ) || [],
            profileCompleted: true,
        });

        return res.status(201).json({
            success: true,
            message: "Profile created successfully",
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
            .select(
                "username uid role avatar country languages experience availability"
            )
            .populate("userId", "username email")
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            total: profiles.length,
            profiles,
        });

    } catch (error) {
        console.error("Get All Profiles Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profiles",
        });
    }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        const { username, avatar, banner, bio, country, role, } = req.body;

        const uid = Number(req.body.uid);
        const age = Number(req.body.age);

        const languages = req.body.languages ? JSON.parse(req.body.languages) : [];

        const socialLinks = req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {};

        const stats = req.body.stats ? JSON.parse(req.body.stats) : {};

        const experience = req.body.experience ? JSON.parse(req.body.experience) : {};

        const availability = req.body.availability ? JSON.parse(req.body.availability) : {};

        const clips = req.body.clips ? JSON.parse(req.body.clips) : [];

        const achievements = req.body.achievements ? JSON.parse(req.body.achievements) : [];

        const teamHistory = req.body.teamHistory ? JSON.parse(req.body.teamHistory) : [];

        const uploadedImages = (req.files as Express.Multer.File[]) || [];

        let uploadIndex = 0;

        const mappedAchievements =
            achievements.map(
                (achievement: any) => {

                    let imageUrl = achievement?.image || "";

                    if (
                        achievement?.hasNewImage &&
                        uploadedImages[uploadIndex]
                    ) {
                        imageUrl = uploadedImages[uploadIndex].path;
                        uploadIndex++;
                    }

                    return {
                        title: achievement?.title?.trim() || "",
                        image: imageUrl,
                    };
                }
            );

        const updatedProfile =
            await Profile.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        username: username?.trim() || "",
                        uid: uid || profile.uid,
                        age: age || profile.age,
                        avatar: avatar || "",
                        banner: banner || "",
                        bio: bio || "",
                        country: country || "",
                        role: role || "",
                        languages,

                        socialLinks: {
                            instagram: socialLinks?.instagram || "",
                            discord: socialLinks?.discord || "",
                        },

                        stats: {
                            currentRank: stats?.currentRank || "",
                            kdRatio: Number(stats?.kdRatio) || 0,
                            headshotPercentage: Number(stats?.headshotPercentage) || 0,
                        },
                        experience: {
                            level: Number(experience?.level) || 1,
                            yearsPlaying: Number(experience?.yearsPlaying) || 0,
                            esportsExperience: Number(experience?.esportsExperience) || 0,
                        },
                        availability: {
                            status: availability?.status || "looking for team",
                        },
                        clips:
                            clips?.map(
                                (
                                    clip: any
                                ) => ({
                                    title: clip?.title || "",
                                    clipUrl: clip?.clipUrl || "",
                                })
                            ) || [],

                        achievements: mappedAchievements,
                        teamHistory:
                            teamHistory?.map(
                                (
                                    team: any
                                ) => ({
                                    teamName: team?.teamName || "",
                                    role: team?.role || "",
                                    duration: team?.duration || "",
                                })
                            ) || [],
                    },
                },
                {
                    returnDocument: "after",
                    runValidators: true,
                }
            );

        const isCompleted =
            updatedProfile?.avatar &&
            updatedProfile?.bio &&
            updatedProfile?.country &&
            updatedProfile?.role;

        if (
            updatedProfile &&
            isCompleted
        ) {
            updatedProfile.profileCompleted = true;

            await updatedProfile.save();
        }

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};