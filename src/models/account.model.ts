import { Schema, models, model, Model } from "mongoose";
import type { AccountDoc } from "@/types";

const AccountSchema = new Schema<AccountDoc>({
    providerAccountId: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Number,
        required: true,
    },
    scope: {
        type: String,
    },
    id_token: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export const Account: Model<AccountDoc> =
    (models.Account as Model<AccountDoc>) ||
    model<AccountDoc>("Account", AccountSchema);
