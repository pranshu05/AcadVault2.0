"use client";

import MaterialCard, { type MaterialCardData } from "@/components/(requests)/MaterialCard";
import { useState } from "react";
import { openFile } from "@/lib/client-helper-functions";
import { Trash2, XCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { RequestStatus } from "@/types";

interface RequestData {
    _id: string;
    studentID: string;
    status: RequestStatus;
    material: MaterialCardData & { fileID: string };
}

interface RequestCardProps {
    data: RequestData;
}

const RequestCard = (props: RequestCardProps) => {
    const [data, setData] = useState<RequestData>(props.data);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleOpenFile = async () => {
        openFile(data.material.fileID);
    };

    const handleRequest = async (operation: "approve" | "reject"): Promise<void> => {
        try {
            setIsProcessing(true);
            const response = await fetch(`/api/requests/${operation}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestID: data._id }),
            });

            const res = (await response.json()) as
                | { success: true; data: RequestData }
                | { success: false; error: string };
            if (res.success) {
                setData(res.data);
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsProcessing(true);
            toast.loading("Deleting...");
            const response = await fetch(`/api/requests/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestID: data._id }),
            });

            const res = (await response.json()) as
                | { success: true; message: string }
                | { success: false; error: string };
            if (res.success) {
                toast.success("Material request deleted successfully!");
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            toast.error("Could not delete material request");
            throw error;
        } finally {
            setIsProcessing(false);
            window.location.reload();
        }
    };

    const handleApprove = async () => {
        toast.promise(handleRequest("approve"), {
            loading: "Approving...",
            success: <b>Material requested approved successfully!</b>,
            error: <b>Could not approve</b>,
        });
    };

    const handleReject = async () => {
        toast.promise(handleRequest("reject"), {
            loading: "Rejecting...",
            success: <b>Material requested rejected successfully!</b>,
            error: <b>Could not reject</b>,
        });
    };

    return (
        <div className="text-xs sm:text-sm md:text-base border rounded-lg p-4 bg-neutral-950 border-gray-300">
            <div className="flex flex-row justify-between items-center text-sm">
                <div className="text-gray-200">Submitted by {data.studentID}</div>
                <div className="bg-neutral-950 border border-gray-300 px-2 py-1 rounded-full">{data.status}</div>
            </div>
            <MaterialCard data={data.material} />
            <div className="flex justify-between items-stretch mx-2 text-sm">
                <button onClick={handleOpenFile} className="bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg px-5 py-2.5">Open File</button>
                <div className="flex gap-2 h-fit self-center">
                    {data.status !== "APPROVED" && (<button onClick={handleApprove} className="bg-neutral-950 hover:bg-neutral-950 p-2 border rounded disabled:bg-opacity-50 disabled:cursor-not-allowed border-gray-300" disabled={isProcessing}><CheckCircle className="size-5" /></button>)}
                    {data.status !== "REJECTED" && (<button onClick={handleReject} className="bg-neutral-950 hover:bg-neutral-950 p-2 border rounded disabled:bg-opacity-50 disabled:cursor-not-allowed font-light border-gray-300" disabled={isProcessing}><XCircle className="size-5" /></button>)}
                    <button onClick={handleDelete} className="bg-neutral-950 hover:bg-neutral-950 p-2 border border-gray-300 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={isProcessing}><Trash2 className="size-5" /></button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
