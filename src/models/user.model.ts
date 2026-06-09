import mongoose, { Document } from "mongoose";



export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    AccStatus: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        AccStatus: {
            type: String,
            enum: ["Active", "Suspended", "Banned"],
            default: "Active",
        },

    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);