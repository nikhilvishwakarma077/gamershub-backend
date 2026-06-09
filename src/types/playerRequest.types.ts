import { Types } from "mongoose";

export interface IPlayerRequest {
    userId: Types.ObjectId;
    profileId: Types.ObjectId;

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