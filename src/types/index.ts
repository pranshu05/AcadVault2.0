import type { Types } from "mongoose";

export type RequestStatus = "REQUESTED" | "APPROVED" | "REJECTED";

export interface UserDoc {
    _id: Types.ObjectId;
    name: string;
    email: string;
    image?: string;
    emailVerified: boolean;
}

export interface CourseDoc {
    _id: Types.ObjectId;
    courseName: string;
    folderID: string;
    categoryCode?: string;
}

export interface MaterialDoc {
    _id: Types.ObjectId;
    fileID: string;
    courseName: string;
    materialType: string;
    exam?: string;
    number?: string;
    year?: number;
    referenceBookName?: string;
    approvedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MaterialWithUploader extends Omit<MaterialDoc, "_id"> {
    _id: Types.ObjectId | string;
    uploaderName: string;
}

export interface RequestDoc {
    _id: Types.ObjectId;
    material: Types.ObjectId | MaterialDoc;
    studentID: string;
    status: RequestStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface SessionDoc {
    _id: Types.ObjectId;
    sessionToken: string;
    userId: Types.ObjectId;
    expires: Date;
}

export interface AccountDoc {
    _id: Types.ObjectId;
    providerAccountId: string;
    access_token: string;
    expires_at: number;
    scope?: string;
    id_token: string;
    userId: Types.ObjectId;
}

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiError {
    success: false;
    error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface ContributorStats {
    name: string;
    uploadCount: number;
    email: string;
}

export interface ResourceManager {
    name: string;
    batch: string;
    email: string;
}

export interface FilenameInput {
    courseName: string;
    materialType: string;
    year?: string | number;
    exam?: string;
    number?: string;
    referenceBookName?: string;
}
