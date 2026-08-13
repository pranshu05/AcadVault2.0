import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { clientPromise } from "@/lib/mongodb.config";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:
                "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=daiict.ac.in",
        }),
    ],
    adapter: MongoDBAdapter(clientPromise, { databaseName: "catalogue" }),
    callbacks: {
        async session({ session, user }) {
            if (session.user && user.email) {
                session.user.id = user.email.split("@")[0];
            }
            return session;
        },
    },
};

export const auth = NextAuth(authOptions);
