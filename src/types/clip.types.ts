import { Types } from "mongoose";


export interface ClipResponse {
    clipId: Types.ObjectId;
    profileId: Types.ObjectId;

    title: string;
    clipUrl: string;
    uploadedAt: Date;

    username: string;
    avatar: string;
    role: string;

}