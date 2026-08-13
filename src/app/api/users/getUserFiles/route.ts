import { NextResponse, type NextRequest } from "next/server";
import { ApprovedMaterial } from "@/models/material.model";
import { Request } from "@/models/request.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    const email = searchParams.get("email");

    try {
        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" });
        }

        await connectMongoDB();

        const requests = await Request.find({ studentID: email.split("@")[0] });
        const materials = await Promise.all(
            requests.map(async (request) => {
                const material = await ApprovedMaterial.findById(request.material);
                return material ? material.toObject() : null;
            }),
        );

        const filteredMaterials = materials.filter((material) => material !== null);

        return NextResponse.json({ success: true, data: filteredMaterials });
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 },
        );
    }
};
