import { NextResponse, type NextRequest } from "next/server";
import { Request } from "@/models/request.model";
import "@/models/material.model";
import { User } from "@/models/user.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = req.nextUrl;
        const email = searchParams.get("email");
        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email query parameter is required" },
                { status: 400 },
            );
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 },
            );
        }

        const emailPrefix = email.split("@")[0];

        const requests = await Request.find({ studentID: emailPrefix, status: "APPROVED" })
            .populate("material")
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: requests });
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 },
        );
    }
};
