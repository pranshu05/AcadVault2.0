import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    description: "Browse through the academic resources",
};

interface BrowseMaterialLayoutProps {
    children: ReactNode;
}

const BrowseMaterialLayout = ({ children }: BrowseMaterialLayoutProps) => {
    return <div className="w-11/12 sm:w-4/5 md:w-3/4 xl:w-2/3 mx-auto my-10">{children}</div>;
};

export default BrowseMaterialLayout;
