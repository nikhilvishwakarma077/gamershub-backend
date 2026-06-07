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
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        AccStatus: { type: String, default: "Active" },

    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);