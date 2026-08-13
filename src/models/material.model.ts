import { Schema, models, model, Model } from "mongoose";
import type { MaterialDoc } from "@/types";

const MaterialSchema = new Schema<MaterialDoc>(
    {
        fileID: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        materialType: {
            type: String,
            required: true,
        },
        exam: {
            type: String,
        },
        number: {
            type: String,
        },
        year: {
            type: Number,
        },
        referenceBookName: {
            type: String,
        },
        approvedBy: {
            type: String,
        },
    },
    { timestamps: true },
);

export const UnapprovedMaterial: Model<MaterialDoc> =
    (models.UnapprovedMaterial as Model<MaterialDoc>) ||
    model<MaterialDoc>("UnapprovedMaterial", MaterialSchema);

export const ApprovedMaterial: Model<MaterialDoc> =
    (models.ApprovedMaterial as Model<MaterialDoc>) ||
    model<MaterialDoc>("ApprovedMaterial", MaterialSchema);

export default MaterialSchema;
