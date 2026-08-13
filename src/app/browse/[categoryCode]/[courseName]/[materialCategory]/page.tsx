"use client";

import { useState, useEffect } from "react";
import BrowseMaterialCard from "@/components/(browse)/BrowseMaterialCard";
import Loading from "@/components/(layout)/Loading";
import NothingHere from "@/components/(layout)/NothingHere";
import { Helmet } from "react-helmet";
import type { MaterialWithUploader } from "@/types";

interface MaterialResultsPageProps {
    params: { categoryCode: string; courseName: string; materialCategory: string };
}

const parseStart = (number: string | undefined): number => {
    if (!number) return 0;
    const match = number.match(/^\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

const MaterialResultsPage = ({ params }: MaterialResultsPageProps) => {
    const courseName = decodeURIComponent(params.courseName);
    const materialCategory = decodeURIComponent(params.materialCategory);
    const [data, setData] = useState<MaterialWithUploader[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "/api/materials?" +
                        new URLSearchParams({ courseName, materialCategory }).toString(),
                    { method: "GET" },
                );
                const json = (await response.json()) as { data: MaterialWithUploader[] };
                setData(json.data);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        };
        fetchData();
    }, [courseName, materialCategory]);

    if (data === null) return <Loading />;
    if (data.length === 0) return <NothingHere />;

    const groupedData = data.reduce<Record<string, MaterialWithUploader[]>>((acc, material) => {
        const year = material.year ? String(material.year) : "Uncategorized";
        if (!acc[year]) acc[year] = [];
        acc[year].push(material);
        return acc;
    }, {});

    Object.keys(groupedData).forEach((year) => {
        groupedData[year].sort((a, b) => {
            const startA = parseStart(a.number);
            const startB = parseStart(b.number);

            if (startA !== startB) {
                return startA - startB;
            }

            const nameA = (a as { name?: string }).name || "";
            const nameB = (b as { name?: string }).name || "";
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" });
        });
    });

    return (
        <div className="mx-auto">
            <Helmet>
                <title>{courseName} - {materialCategory} | AcadVault2.0</title>
            </Helmet>
            <h1 className="text-2xl font-bold mt-4">{courseName}</h1>
            {Object.keys(groupedData).sort().map((year) => (
                <div key={year}>
                    <h2 className="text-base my-2 text-gray-200">{year === "Uncategorized" ? "" : `Course materials for ${year}`}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        {groupedData[year].map((material, index) => (
                            <BrowseMaterialCard key={index} data={material} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialResultsPage;
