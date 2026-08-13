"use client";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserContributionsCard from "@/components/(userContributions)/UserContributionsCard";
import type { UserFile } from "@/components/(me)/UserFileCard";
import type { ApiResponse } from "@/types";

interface ContributionRecord {
    _id: string;
    material: UserFile;
}

interface UserContributionsPageProps {
    params: { userId: string };
}

const UserContributionsPage = ({ params }: UserContributionsPageProps) => {
    const { userId } = params;
    const email = `${userId}@daiict.ac.in`;
    const [contributions, setContributions] = useState<ContributionRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch(`/api/userContributions?email=${email}`);
                const data = (await response.json()) as ApiResponse<ContributionRecord[]>;
                if (data.success) {
                    setContributions(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [email]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-center py-5 text-red-500">Error: {error}</div>;
    if (contributions.length === 0) return <div className="text-center py-5">No contributions found.</div>;

    return (
        <div className="left-0 top-0 h-full w-full">
            <Helmet>
                <title>Material Contributions by {userId}</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center mx-auto w-11/12 sm:w-3/4 py-8">
                <div className="bg-neutral-950 border border-gray-300 rounded-lg transition ease-in-out duration-300 p-5 mb-8 w-full">
                    <h2 className="text-2xl font-semibold mb-2">Uploaded Materials by {userId}</h2>
                    <div className="flex-col gap-2">
                        Total {contributions.length} files uploaded!!
                        {contributions.map((file) => (
                            <UserContributionsCard key={file._id} file={file.material} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContributionsPage;
