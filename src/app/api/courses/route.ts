import { NextResponse, type NextRequest } from "next/server";
import { Course } from "@/models/course.model";
import { connectMongoDB } from "@/lib/mongodb.config";
import { createFolder } from "@/lib/drive-operations";

interface CourseFilter {
    courseName?: string | null;
    categoryCode?: string | null;
}

interface CreateCourseBody {
    courseName: string;
    categoryCode?: string;
}

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = request.nextUrl;
        let courseName: string | null = searchParams.get("courseName");
        if (courseName === "*") courseName = null;
        const categoryCode = searchParams.get("categoryCode");
        const filter: CourseFilter = { courseName, categoryCode };

        (Object.keys(filter) as (keyof CourseFilter)[]).forEach((key) => {
            if (!filter[key]) {
                delete filter[key];
            }
        });

        await connectMongoDB();
        const data = await Course.find(filter).sort({ courseName: 1 });

        return NextResponse.json({ success: true, data });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { success: false, error: e instanceof Error ? e.message : "Unknown error" },
            { status: 500 },
        );
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const { courseName, categoryCode } = (await request.json()) as CreateCourseBody;
        await connectMongoDB();
        const _course = await Course.findOne({ courseName });

        if (_course) {
            return NextResponse.json(
                { success: false, error: "Course already exists" },
                { status: 400 },
            );
        }

        const { id } = await createFolder(courseName, "Materials");
        if (!id) {
            return NextResponse.json(
                { success: false, error: "Failed to create folder" },
                { status: 500 },
            );
        }
        const course = new Course({ courseName, folderID: id, categoryCode });
        await course.save();

        return NextResponse.json({ success: true, data: course });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { success: false, error: e instanceof Error ? e.message : "Unknown error" },
            { status: 500 },
        );
    }
};
