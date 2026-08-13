"use client";

import { useState, useEffect } from "react";
import type { ContributorStats, ApiResponse } from "@/types";

const DriveContributors = () => {
    const [contributors, setContributors] = useState<ContributorStats[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/driveContributors")
            .then((res) => res.json() as Promise<ApiResponse<ContributorStats[]>>)
            .then((data) => {
                if (data.success) {
                    setContributors(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching contributors:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="w-full my-8 text-center">Loading...</div>;
    }

    const sortedContributors = [...contributors].sort((a, b) => b.uploadCount - a.uploadCount);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5 mb-10">
            {sortedContributors.map((contributor, index) => (
                <a href={`/userContributions/${contributor.email.split("@")[0]}`} key={index} className="p-2 bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-center flex flex-col gap-1">
                    <div>{contributor.name}</div>
                    <div className="text-sm text-gray-300">
                        {contributor.uploadCount} {contributor.uploadCount > 1 ? "contributions" : "contribution"}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default DriveContributors;
