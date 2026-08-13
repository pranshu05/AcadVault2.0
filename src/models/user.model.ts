import { Schema, models, model, Model } from "mongoose";
import type { UserDoc } from "@/types";

const UserSchema = new Schema<UserDoc>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
});

export const User: Model<UserDoc> =
    (models.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema);
