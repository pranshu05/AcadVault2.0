import { Schema, models, model, Model } from "mongoose";
import type { RequestDoc } from "@/types";

const RequestSchema = new Schema<RequestDoc>(
    {
        material: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: function (this: RequestDoc) {
                return this.status === "APPROVED" ? "ApprovedMaterial" : "UnapprovedMaterial";
            },
        },
        studentID: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const Request: Model<RequestDoc> =
    (models.Request as Model<RequestDoc>) || model<RequestDoc>("Request", RequestSchema);
