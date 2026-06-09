import mongoose, { Schema, Types } from "mongoose";
import { IPlayerRequest } from "../types/playerRequest.types.js";

const playerRequestSchema = new Schema<IPlayerRequest>(

    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        joiningType: {
            type: String,
            enum: ["permanent", "temporary", "scrims only"],
            required: true
        },

        activeTime: {
            type: String,
            required: true,
            trim : true,
            
        },

        languagesComfortable: {
            type: [String],
            default: []
        },

        instagram: {
            type: String,
            required: true,
            trim: true,
        },

        expiresAt: {
            type: Date,

            default: () => {
                return new Date(Date.now() + 12 * 60 * 60 * 1000);
            }
        }
    },

    {
        timestamps: true
    }
);

playerRequestSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);


export const PlayerRequest = mongoose.model<IPlayerRequest>(
    "PlayerRequest",
    playerRequestSchema
);