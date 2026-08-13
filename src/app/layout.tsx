import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SessionProvider from "@/components/(layout)/SessionProvider";
import Redirecter from "@/components/(layout)/Redirecter";
import Navbar from "@/components/(layout)/NavBar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isResourceManager, getSession } from "@/lib/server-helper-functions";

export const metadata: Metadata = {
    title: "AcadVault2.0",
    description: "A living open-source repository of Academic Resources for DA-IICT",
};

interface RootLayoutProps {
    children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const session = await getSession();
    const _isResourceManager = Boolean(
        session && session.user && (await isResourceManager(session.user.id)),
    );

    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white">
                <Analytics />
                <SpeedInsights />
                <Toaster position="top-center" reverseOrder={false} />
                <SessionProvider session={session}>
                    <Redirecter session={session} isResourceManager={_isResourceManager}>
                        <Navbar isResourceManager={_isResourceManager} session={session} />
                        {children}
                    </Redirecter>
                </SessionProvider>
            </body>
        </html>
    );
}
