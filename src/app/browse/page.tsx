"use client";

import BrowseCard from "@/components/(browse)/BrowseCard";
import { COURSE_CATEGORY_CODES } from "@/lib/constants";
import { Helmet } from "react-helmet";

const CourseCategoryListPage = () => {
    const allCategories = COURSE_CATEGORY_CODES;

    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 mx-auto">
            <Helmet>
                <title>Browse | AcadVault2.0</title>
            </Helmet>
            {allCategories.map((categoryCode, index) => (
                <BrowseCard key={index} href={`/browse/${categoryCode}`}>
                    <div className="card-text-0">{categoryCode}</div>
                </BrowseCard>
            ))}
        </div>
    );
};

export default CourseCategoryListPage;
