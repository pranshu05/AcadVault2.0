import { MATERIAL_TYPES } from "@/lib/constants";
import { openFile } from "@/lib/client-helper-functions";
import type { MaterialWithUploader } from "@/types";

interface BrowseMaterialCardProps {
    data: MaterialWithUploader;
}

const BrowseMaterialCard = ({ data }: BrowseMaterialCardProps) => {
    const handleClick = () => {
        openFile(data.fileID);
    };

    return (
        <div className="flex flex-col max-w-full max-h-full overflow-y-scroll bg-neutral-950 border border-gray-300 px-3 py-5 rounded-lg cursor-pointer no-scrollbar" onClick={handleClick}>
            <div className="card-text-6 mb-2 text-gray-200">{data.courseName}</div>
            {[MATERIAL_TYPES.ASSIGNMENT_QUESTIONS, MATERIAL_TYPES.ASSIGNMENT_SOLUTION].includes(data.materialType as never) && (
                <div>
                    <div className="card-text-3">Assignment {data.number}</div>
                    <div className="card-text-6 inline-flex items-center justify-center">{data.materialType.split(" ")[1]}</div>
                </div>
            )}
            {data.exam && (
                <div>
                    <div className="card-text-3">{data.exam}</div>
                    <div className="card-text-6 inline-flex items-center justify-center">{data.materialType.substring(5)}</div>
                </div>
            )}
            {data.materialType === MATERIAL_TYPES.REFERENCE_BOOK && (
                <div className="card-text-5 overflow-y-scroll no-scrollbar break-words">{data.referenceBookName}</div>
            )}
            {data.materialType === MATERIAL_TYPES.LECTURE_SLIDES && (
                <div>
                    <div className="card-text-3">Lecture-{data.number}</div>
                    <div className="card-text-6 inline-flex items-center justify-center">Slides</div>
                </div>
            )}
            {data.materialType === MATERIAL_TYPES.HANDWRITTEN_NOTES && (
                <div className="card-text-3">Handwritten Notes</div>
            )}
            <div className="flex justify-between mt-3 text-gray-200">
                {data.year && <div className="card-text-4">{data.year}</div>}
                <div className="flex card-text-6 items-center justify-center gap-1">
                    by <span className="font-semibold">{data.uploaderName}</span>
                </div>
            </div>
        </div>
    );
};

export default BrowseMaterialCard;
