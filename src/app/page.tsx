import { Github, Upload, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import FooterStats from "../components/(layout)/FooterStats";

export const metadata: Metadata = {
    title: "AcadVault2.0",
    description: "A living open-source repository of Academic Resources for DA-IICT",
};

export default async function HomePage() {
    return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full px-2">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <h1 className="mb-4 text-5xl lg:text-6xl font-extrabold tracking-tight">Welcome to<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500"> AcadVault2.0</span></h1>
                <p className="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 text-gray-200">A living open-source repository of Academic Resources for DA-IICT. Share, discover, and learn from a growing collection of materials.</p>
                <div className="flex flex-row">
                    <a href="https://github.com/Acadvault/AcadVault2.0" target="_blank"><button className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2"><Github className="w-4 h-4 me-2" /> GitHub</button></a>
                    <a href="/browse"><button className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2"><BookOpen className="w-4 h-4 me-2" /> Browse</button></a>
                    <a href="/new-material"><button className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-950 border border-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2"><Upload className="w-4 h-4 me-2" />Upload</button></a>
                </div>
                <div className="absolute inline-flex gap-4 md:gap-8 lg:gap-12 bottom-0 mb-3 text-sm font-medium text-center">
                    <FooterStats />
                </div>
            </div>
        </div>
    );
}
