"use client";

import React from "react";
import data from "./data.json";
import ContributorCard from "@/components/(about)/ContributorCard";
import DriveContributors from "@/components/(about)/DriveContributors";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Helmet } from "react-helmet";
import type { ResourceManager } from "@/types";

const AboutPage = () => {
    const managers: ResourceManager[] = [...(data.resourceManagers as ResourceManager[])];

    return (
        <div className="left-0 top-0 h-full -z-10 w-full">
            <Helmet>
                <title>About | AcadVault2.0</title>
                <meta name="description" content="About AcadVault2.0 project." />
            </Helmet>
            <h1 className="text-2xl lg:text-3xl font-bold text-center mt-10">What is AcadVault2.0?</h1>
            <p className="text-base lg:text-lg text-center mt-5 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mx-auto">The project is based on the vanilla{" "}<a href="https://github.com/Tikam02/AcadVault" className="text-blue-500">Acadvault</a>{" "}GitHub repository of our alumni{" "}<a href="https://github.com/Tikam02" className="text-blue-500">Tikam Singh Alma</a>. We aim to maintain a network for an{" "}<b className="whitespace-nowrap">Academic Material Sharing Platform</b>.</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-center mt-10">Resource Managers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5 mb-10">
                {managers.map((manager, index) => (
                    <ContributorCard key={index} data={manager} />
                ))}
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-center mt-10">Material Contributors</h1>
            <DriveContributors />
            <footer className="bottom-0 left-0 w-full bg-transparent text-sm p-5 border-t border-gray-300">
                <div className="flex justify-between">
                    <p>&copy; {new Date().getFullYear()} | AcadVault2.0</p>
                    <div className="flex">
                        <a href="https://github.com/AcadVault/AcadVault2.0" target="_blank" rel="noopener noreferrer" className="me-2"><FaGithub size={24} /></a>
                        <a href="https://discord.gg/mbAJsEnXgr" target="_blank" rel="noopener noreferrer" className="me-2"><FaDiscord size={24} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
