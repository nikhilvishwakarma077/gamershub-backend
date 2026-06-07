import mongoose, { Schema, Types } from "mongoose";


// ================= INTERFACES =================

interface SocialLinksType {
    instagram: string;
    discord: string;
}

interface Stats {
    currentRank: string;
    kdRatio: number;
    headshotPercentage: number;
}

interface Clips {
    title: string;
    clipUrl: string[];
    thumbnailUrl: string;
    uploadedAt: Date;
}

interface Experience {
    level: number;
    yearsPlaying: number;
    esportsExperience: number;
}

interface Availability {
    status: "looking for team" | "open for scrims" | "busy";
}

interface TeamHistory {
    teamName: string;
    role: string;
    duration: string;
}

interface Achievement {
    title: string;
    image: string;
}

interface GamerProfile {

    userId: Types.ObjectId;
    username: string;
    uid: number;
    age: number;
    avatar: string;
    banner: string;
    bio: string;
    country: string;
    languages: string[];
    role: string;
    socialLinks : SocialLinksType;
    stats: Stats;
    clips: Clips[];
    experience: Experience;
    availability: Availability;
    teamHistory: TeamHistory[];
    achievements: Achievement[];
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
} 



const profileSchema = new Schema<GamerProfile>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
        },

        uid: {
            type: Number,
            required: true,
        },

        age: {
            type: Number,
            default: 18,
        },

        avatar: {
            type: String,
            default: "",
        },

        banner: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        country: {
            type: String,
            default: "",
        },

        languages: {
            type: [String],
            default: [],
        },

        role: {
            type: String,
            default: "",
        },

        socialLinks: {
            instagram: {
                type: String,
                required: true,
                default:"",
            },

            discord: {
                type: String,
                default:"",
            },
        },

  
        stats: {
            currentRank: {
                type: String,
                default: "",
            },

            kdRatio: {
                type: Number,
                default: 0,
            },

            headshotPercentage: {
                type: Number,
                default: 0,
            },
        },

 
        clips: [
            {
                title: {
                    type: String,
                    default: "",
                },

                clipUrl: {
                    type: String,
                    default: "",
                },

                thumbnailUrl: {
                    type: String,
                    default: "",
                },

                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],


        experience: {
            level: {
                type: Number,
                default: 1,
            },

            yearsPlaying: {
                type: Number, 
                default: 0,
            },

            esportsExperience: {
                type: Number,
                default: 0,
            },
        },

        teamHistory: [
            {
                teamName: {
                    type: String,
                    default: "",
                },

                role: {
                    type: String,
                    default: "",
                },

                duration: {
                    type: String,
                    default: "",
                },
            },
        ],


        achievements: [
            {
                title: {
                    type: String,
                    default: "",
                },

                image: {
                    type: String,
                    default: "",
                },
            },
        ],


        availability: {
            status: {
                type: String,
                enum: [
                    "looking for team",
                    "open for scrims",
                    "already in team",
                ],

                default: "looking for team",
            },
        },


        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

export const Profile = mongoose.model<GamerProfile>(
    "Profile",
    profileSchema
);