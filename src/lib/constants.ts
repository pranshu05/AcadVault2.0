export const ROOT_FOLDER_ID: string | undefined = process.env.DRIVE_ROOT_FOLDER_ID;
export const MATERIALS_FOLDER_ID: string | undefined = process.env.DRIVE_MATERIALS_FOLDER_ID;
export const REQUESTS_FOLDER_ID: string | undefined = process.env.DRIVE_REQUESTS_FOLDER_ID;

export const EXAMS = {
    INSEM1: "Insem-I",
    INSEM2: "Insem-II",
    MIDSEM: "Midsem",
    ENDSEM: "Endsem",
} as const;

export const MATERIAL_TYPES = {
    ASSIGNMENT_QUESTIONS: "Assignment Questions",
    ASSIGNMENT_SOLUTION: "Assignment Solution",
    EXAM_QUESTION_PAPER: "Exam Question Paper",
    EXAM_PAPER_SOLUTION: "Exam Paper Solution",
    REFERENCE_BOOK: "Reference Book",
    LECTURE_SLIDES: "Lecture Slides",
    HANDWRITTEN_NOTES: "Handwritten Notes",
} as const;

export const MATERIAL_CATEGORIES = {
    EXAMS: "Exams",
    LECTURES: "Lectures",
    ASSIGNMENTS: "Assignments",
    REFERENCE_BOOKS: "Reference Books",
} as const;

export const COURSE_CATEGORY_CODES = [
    "IT",
    "EL",
    "CT",
    "SC",
    "IE",
    "HM",
    "MC",
    "CS",
    "IC",
    "PC",
] as const;

export type ExamLabel = (typeof EXAMS)[keyof typeof EXAMS];
export type MaterialType = (typeof MATERIAL_TYPES)[keyof typeof MATERIAL_TYPES];
export type MaterialCategory = (typeof MATERIAL_CATEGORIES)[keyof typeof MATERIAL_CATEGORIES];
export type CourseCategoryCode = (typeof COURSE_CATEGORY_CODES)[number];
