import { Schema, models, model, Model } from "mongoose";
import type { CourseDoc } from "@/types";

const CourseSchema = new Schema<CourseDoc>({
    courseName: {
        type: String,
        required: true,
        unique: true,
    },
    folderID: {
        type: String,
        required: true,
    },
    categoryCode: {
        type: String,
    },
});

export const Course: Model<CourseDoc> =
    (models.Course as Model<CourseDoc>) || model<CourseDoc>("Course", CourseSchema);
