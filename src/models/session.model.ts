import { Schema, models, model, Model } from "mongoose";
import type { SessionDoc } from "@/types";

const SessionSchema = new Schema<SessionDoc>({
    sessionToken: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
});

export const Session: Model<SessionDoc> =
    (models.Session as Model<SessionDoc>) ||
    model<SessionDoc>("Session", SessionSchema);
