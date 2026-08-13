"use client";

import RequestCard from "@/components/(requests)/RequestCard";
import { useState, useEffect } from "react";
import Loading from "@/components/(layout)/Loading";
import NothingHere from "@/components/(layout)/NothingHere";
import type { ApiResponse, RequestStatus } from "@/types";

interface RequestPageItem {
    _id: string;
    studentID: string;
    status: RequestStatus;
    material: {
        _id: string;
        fileID: string;
        courseName: string;
        materialType: string;
        referenceBookName?: string;
        exam?: string;
        number?: string;
        year?: number;
        approvedBy?: string;
        createdAt: string;
    };
}

function RequestsPage() {
    const [cardData, setCardData] = useState<RequestPageItem[] | null>(null);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await fetch("/api/requests");
                const dataJson = (await response.json()) as ApiResponse<RequestPageItem[]>;
                if (dataJson.success) setCardData(dataJson.data);
                else throw new Error(dataJson.error);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        };
        fetchCardData();
    }, []);

    if (cardData === null) return <Loading />;
    if (cardData.length === 0) return <NothingHere />;

    return (
        <div className="w-11/12 sm:w-4/5 md:w-[78%] mx-auto my-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {cardData.map((request, index) => (
                    <RequestCard data={request} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RequestsPage;
