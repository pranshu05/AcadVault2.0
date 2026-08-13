import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";
import type { FilenameInput } from "@/types";

export const generateFilename = ({
    courseName,
    materialType,
    year,
    exam,
    number,
    referenceBookName,
}: FilenameInput): string => {
    if (referenceBookName) return referenceBookName;
    if (exam) {
        return `${courseName} ${exam} ${year} ${materialType.split(" ")[1]} ${materialType.split(" ")[2]}`;
    }
    return `${courseName} Assignment-${number} ${materialType.split(" ")[1]} ${year}`;
};

export const getExtention = (fileName: string): string => {
    const arr = fileName.split(".");
    return arr[arr.length - 1];
};

export const getSession = async (): Promise<Session | null> => {
    const session = await getServerSession(authOptions);
    return session;
};

export const getCurrentUser = async (): Promise<Session["user"] | null> => {
    const session = await getSession();
    if (!session) return null;
    return session.user;
};

export const isResourceManager = async (id: string | undefined | null): Promise<boolean> => {
    if (!id) return false;
    return Boolean(process.env.RESOURCE_MANAGERS?.includes(id));
};
