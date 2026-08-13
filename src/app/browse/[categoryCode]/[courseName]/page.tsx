"use client";

import { MATERIAL_CATEGORIES } from "@/lib/constants";
import BrowseCard from "@/components/(browse)/BrowseCard";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiExam, PiBooks } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import { Helmet } from "react-helmet";
import type { ReactElement } from "react";

const iconList: Record<string, ReactElement> = {
    Exams: <PiExam />,
    Lectures: <FaChalkboardTeacher />,
    Assignments: <MdOutlineAssignment />,
    "Reference Books": <PiBooks />,
};

interface MaterialCategoryListPageProps {
    params: { categoryCode: string; courseName: string };
}

const MaterialCategoryListPage = ({ params }: MaterialCategoryListPageProps) => {
    const categoryCode = params.categoryCode;
    const courseName = decodeURIComponent(params.courseName);

    const materialCategoryList: string[] = [];
    for (const key in MATERIAL_CATEGORIES) {
        materialCategoryList.push(MATERIAL_CATEGORIES[key as keyof typeof MATERIAL_CATEGORIES]);
    }

    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
            <Helmet>
                <title>{categoryCode} - {courseName} | AcadVault2.0</title>
            </Helmet>
            {materialCategoryList.map((category, index) => (
                <BrowseCard key={index} href={`/browse/${categoryCode}/${courseName}/${category}`}>
                    <div className="flex flex-col items-center">
                        <div className=" text-6xl md:text-7xl mb-5">{iconList[category]}</div>
                        <div className="card-text-2">{category}</div>
                    </div>
                </BrowseCard>
            ))}
        </div>
    );
};

export default MaterialCategoryListPage;
