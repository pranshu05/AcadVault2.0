import { NextResponse, type NextRequest } from "next/server";
import { Request } from "@/models/request.model";
import { User } from "@/models/user.model";
import { connectMongoDB } from "@/lib/mongodb.config";
import type { ContributorStats } from "@/types";

export const GET = async (_req: NextRequest) => {
    try {
        await connectMongoDB();

        const deldupe = <T>(arr: T[]): T[] => [...new Set(arr)];

        const users = await User.find();
        const requests = await Request.find({ status: "APPROVED" });
        const all_students = requests.map((request) => request.studentID);
        const students = deldupe(all_students);

        const studentData: ContributorStats[] = users
            .filter((user) => {
                const emailPrefix = user.email.split("@")[0];
                return students.includes(emailPrefix);
            })
            .map((user) => {
                const emailPrefix = user.email.split("@")[0];
                const uploadCount = requests.filter(
                    (request) => request.studentID === emailPrefix,
                ).length;
                return { name: user.name, uploadCount, email: user.email };
            });

        return NextResponse.json({ success: true, data: studentData });
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 },
        );
    }
};
