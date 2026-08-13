import { NextResponse, type NextRequest } from "next/server";
import { generateFilename, getExtention } from "@/lib/server-helper-functions";
import { uploadFile, type UploadableFile } from "@/lib/drive-operations";
import { UnapprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { connectMongoDB } from "@/lib/mongodb.config";
import { getCurrentUser } from "@/lib/server-helper-functions";

export const GET = async () => {
    try {
        await connectMongoDB();
        const requests = await MaterialRequest.find({})
            .populate("material")
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: requests });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const user = await getCurrentUser();

        if (!user) throw new Error("User not found");

        const studentID = user.id;
        const courseName = (formData.get("otherCourseName") || formData.get("courseName")) as
            | string
            | null;
        const materialType = formData.get("materialType") as string | null;
        const file = formData.get("file") as File | null;
        const year = (formData.get("year") || undefined) as string | undefined;
        const number = (formData.get("number") || undefined) as string | undefined;
        const exam = (formData.get("exam") || undefined) as string | undefined;
        const referenceBookName = (formData.get("referenceBookName") || undefined) as
            | string
            | undefined;

        if (!file || !courseName || !materialType) {
            throw new Error("Missing required fields");
        }

        const data = {
            studentID,
            courseName,
            materialType,
            year,
            number,
            exam,
            referenceBookName,
            file,
        };
        const fileName = `${generateFilename(data)}.${getExtention(file.name)}`;
        const uploadable: UploadableFile = file;
        const { id, webViewLink } = await uploadFile(uploadable, "Requests", fileName);
        if (!id) throw new Error("Upload failed: no file id returned");
        const fileID = id;
        await connectMongoDB();
        const material = new UnapprovedMaterial({
            fileID,
            courseName,
            materialType,
            exam,
            number,
            year,
            referenceBookName,
        });
        await material.save();
        const request = new MaterialRequest({
            material: material._id,
            studentID,
            status: "REQUESTED",
        });
        await request.save();

        return NextResponse.json({
            success: true,
            data: { ...data, fileID, fileName, webViewLink },
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
