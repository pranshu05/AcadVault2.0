import { NextResponse, type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb.config";
import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";
import type { HydratedDocument } from "mongoose";
import type { MaterialDoc } from "@/types";

interface CheckMaterialBody {
    courseName: string;
    materialType: string;
    year?: string;
    number?: string;
    exam?: string;
}

export const POST = async (req: NextRequest) => {
    try {
        await connectMongoDB();
        const { courseName, materialType, year, number, exam } =
            (await req.json()) as CheckMaterialBody;

        if (materialType === "Handwritten Notes" || materialType === "Reference Book") {
            return NextResponse.json({ success: true, exists: false });
        }

        const query: Record<string, unknown> = {
            courseName,
            materialType,
            ...(year && { year }),
            ...(exam && { exam }),
        };
        const approvedMaterials = await ApprovedMaterial.find(query);
        const unapprovedMaterials = await UnapprovedMaterial.find(query);

        const isDuplicate = (materials: HydratedDocument<MaterialDoc>[]): boolean =>
            materials.some((material) => {
                if (number && material.number) {
                    if (material.number.includes("to")) {
                        const [start, end] = material.number
                            .split("to")
                            .map((n) => parseInt(n.trim()));
                        const [numStart, numEnd] = number
                            .split("to")
                            .map((n) => parseInt(n.trim()));
                        return numStart >= start && numEnd <= end;
                    }
                    return material.number === number;
                }
                return !number && !material.number;
            });

        if (isDuplicate(approvedMaterials)) {
            return NextResponse.json({ success: true, exists: true, type: "APPROVED" });
        }

        if (isDuplicate(unapprovedMaterials)) {
            return NextResponse.json({ success: true, exists: true, type: "UNAPPROVED" });
        }

        return NextResponse.json({ success: true, exists: false });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 },
        );
    }
};
