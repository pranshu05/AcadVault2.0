import { google, drive_v3 } from "googleapis";

export const getDrive = (): drive_v3.Drive => {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, REFRESH_TOKEN } = process.env;
    const auth = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI,
    );
    auth.setCredentials({ refresh_token: REFRESH_TOKEN });

    return google.drive({ version: "v3", auth });
};
