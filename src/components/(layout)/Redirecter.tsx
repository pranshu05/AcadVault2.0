"use client";

import { redirect, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Session } from "next-auth";

interface RedirecterProps {
    session: Session | null;
    isResourceManager: boolean;
    children: ReactNode;
}

const Redirecter = ({ session, isResourceManager, children }: RedirecterProps) => {
    const pathname = usePathname();
    if (
        !session &&
        !(pathname === "/login" || pathname === "/about" || pathname === "/tos" || pathname === "/privacy")
    )
        redirect("/login");
    if (session && pathname === "/login") redirect("/");
    if (!isResourceManager && pathname === "/requests") redirect("/");
    return <>{children}</>;
};

export default Redirecter;
