import mongoose, { Schema, Types } from "mongoose";

export interface PlayerRequest {

    userId: Types.ObjectId;
    profileId : Types.ObjectId;

    role: string; 

    joiningType:
    | "permanent"
    | "temporary"
    | "scrims only";

    activeTime: string;

    languagesComfortable: string[];

    instagram: string;

    expiresAt: Date;
}


const playerRequestSchema = new Schema<PlayerRequest>(

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
            required: true
        },

        joiningType: {
            type: String,
            enum: ["permanent", "temporary", "scrims only"],
            required: true
        },

        activeTime: {
            type: String,
            required: true
        },

        languagesComfortable: {
            type: [String],
            default: []
        },

        instagram: {
            type: String,
            required: true
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


export const PlayerRequest = mongoose.model<PlayerRequest>(
    "PlayerRequest",
    playerRequestSchema
);