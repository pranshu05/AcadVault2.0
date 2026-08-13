import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { NextResponse, type NextRequest } from "next/server";
import { deleteFile } from "@/lib/drive-operations";
import { connectMongoDB } from "@/lib/mongodb.config";
import { getCurrentUser, isResourceManager } from "@/lib/server-helper-functions";

interface DeleteBody {
    requestID: string;
}

export const DELETE = async (req: NextRequest) => {
    const { requestID } = (await req.json()) as DeleteBody;

    try {
        const user = await getCurrentUser();
        if (!user) throw new Error("User not found");
        const deleterID = user.id;
        if (!(await isResourceManager(deleterID))) throw new Error("User not authorized");
        await connectMongoDB();

        const materialRequest = await MaterialRequest.findOne({ _id: requestID });
        if (!materialRequest) {
            return NextResponse.json({ success: false, error: "Request not found" });
        }

        const material =
            materialRequest.status === "APPROVED"
                ? await ApprovedMaterial.findByIdAndDelete(materialRequest.material)
                : await UnapprovedMaterial.findByIdAndDelete(materialRequest.material);

        if (material) {
            await deleteFile(material.fileID);
        }
        await MaterialRequest.deleteOne({ _id: requestID });

        return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
