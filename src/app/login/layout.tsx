import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | AcadVault2.0",
    description: "Login to AcadVault2.0",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
