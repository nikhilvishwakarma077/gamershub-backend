import { Types } from "mongoose";

export interface SocialLinks {
    instagram: string;
    discord: string;
}

export interface Stats {
    currentRank: string;
    kdRatio: number;
    headshotPercentage: number;
}

export interface Clip {
    title: string;
    clipUrl: string;
    thumbnailUrl: string;
    uploadedAt: Date;
}

export interface Experience {
    level: number;
    yearsPlaying: number;
    esportsExperience: number;
}

export interface Availability {
    status:
        | "looking for team"
        | "open for scrims"
        | "already in team";
}

export interface TeamHistory {
    teamName: string;
    role: string;
    duration: string;
}

export interface Achievement {
    title: string;
    image: string;
}

export interface IGamerProfile {
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
    socialLinks: SocialLinks;
    stats: Stats;
    clips: Clip[];
    experience: Experience;
    availability: Availability;
    teamHistory: TeamHistory[];
    achievements: Achievement[];
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}