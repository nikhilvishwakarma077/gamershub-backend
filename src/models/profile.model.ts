import mongoose, { Schema } from "mongoose";
import { IGamerProfile } from "../types/profile.types.js";

const profileSchema = new Schema<IGamerProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },

        uid: {
            type: Number,
            required: true,
        },

        age: {
            type: Number,
            default: 18,
            min: 1,
            max: 100,
        },

        avatar: {
            type: String,
            default: "",
            trim: true,
        },

        banner: {
            type: String,
            default: "",
            trim: true,
        },

        bio: {
            type: String,
            default: "",
            maxlength: 500,
            trim: true,
        },

        country: {
            type: String,
            default: "",
            trim: true,
        },

        languages: {
            type: [String],
            default: [],
        },

        role: {
            type: String,
            default: "",
            trim: true,
        },

        socialLinks: {
            instagram: {
                type: String,
                default: "",
                trim: true,
                required :true,
            },

            discord: {
                type: String,
                default: "",
                trim: true,
            },
        },

        stats: {
            currentRank: {
                type: String,
                default: "",
                trim: true,
            },

            kdRatio: {
                type: Number,
                default: 0,
                min: 0,
            },

            headshotPercentage: {
                type: Number,
                default: 0,
                min: 0,
                max: 100,
            },
        },

        clips: [
            {
                title: {
                    type: String,
                    default: "",
                    trim: true,
                },

                clipUrl: {
                    type: String,
                    default: "",
                    trim: true,
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
                    trim: true,
                },

                role: {
                    type: String,
                    default: "",
                    trim: true,
                },

                duration: {
                    type: String,
                    default: "",
                    trim: true,
                },
            },
        ],

        achievements: [
            {
                title: {
                    type: String,
                    default: "",
                    trim: true,
                },

                image: {
                    type: String,
                    default: "",
                    trim: true,
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

export const Profile = mongoose.model<IGamerProfile>("Profile", profileSchema);