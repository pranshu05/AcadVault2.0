"use client";

import { formatDate, openFile } from "@/lib/client-helper-functions";
import type { UserFile } from "@/components/(me)/UserFileCard";

interface UserContributionsCardProps {
    file: UserFile;
}

const UserContributionsCard = ({ file }: UserContributionsCardProps) => {
    const formattedDate = formatDate(file.createdAt);
    const handleOpenFile = async () => {
        openFile(file.fileID);
    };

    return (
        <div className="w-full my-3 bg-neutral-950 border border-gray-300 rounded-lg transition ease-in-out duration-300 p-3">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                <div>
                    <div className="mb-4 text-left">
                        <div className="font-semibold">{file.courseName}</div>
                        <div className="text-gray-200 text-sm">{file.materialType}</div>
                    </div>
                    <div className="mb-4">
                        {file.referenceBookName && (
                            <div className="flex text-sm">
                                <div>Book Name:</div>
                                <div className="text-gray-200 ml-1 break-words overflow-hidden">{file.referenceBookName}</div>
                            </div>
                        )}
                        {file.exam && (
                            <div className="flex text-sm">
                                <div>Exam:</div>
                                <div className="text-gray-200 ml-1 break-words overflow-hidden1">{file.exam}</div>
                            </div>
                        )}
                        {file.number && (
                            <div className="flex text-sm">
                                <div>Assignment:</div>
                                <div className="text-gray-200 ml-1 break-words overflow-hidden1">{file.number}</div>
                            </div>
                        )}
                        {file.year && (
                            <div className="flex text-sm">
                                <div>Year:</div>
                                <div className="text-gray-200 ml-1 break-words overflow-hidden1">{file.year}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 items-center text-sm">
                    <button onClick={handleOpenFile} className="bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg px-3 py-2">Open File</button>
                    <div className="flex items-center gap-1 text-gray-200 text-sm"><span>{formattedDate}</span></div>
                </div>
            </div>
        </div>
    );
};

export default UserContributionsCard;
