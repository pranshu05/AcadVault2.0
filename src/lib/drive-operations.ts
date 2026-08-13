import { Readable } from "stream";
import { getDrive } from "./gdrive.config";
import { ROOT_FOLDER_ID, MATERIALS_FOLDER_ID, REQUESTS_FOLDER_ID } from "@/lib/constants";
import type { drive_v3 } from "googleapis";

type FolderName = "ROOT" | "Materials" | "Requests" | string;

export const searchFolder = async (
    folderName: FolderName,
    parentFolderName?: FolderName,
): Promise<string> => {
    if (folderName === "ROOT") return ROOT_FOLDER_ID as string;
    if (folderName === "Materials") return MATERIALS_FOLDER_ID as string;
    if (folderName === "Requests") return REQUESTS_FOLDER_ID as string;

    let parentFilter = "";
    if (parentFolderName) {
        const parentFolderID = await searchFolder(parentFolderName);
        parentFilter = parentFolderName ? `and '${parentFolderID}' in parents` : "";
    }
    const drive = getDrive();
    const res = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${folderName}' ${parentFilter}`,
        fields: "files(id)",
    });
    const files = res.data.files;
    if (files && files.length > 0 && files[0].id) return files[0].id;
    throw { message: "folder-not-found: " + folderName };
};

export interface UploadableFile {
    name: string;
    mimeType?: string;
    arrayBuffer(): Promise<ArrayBuffer>;
}

export const uploadFile = async (
    fileObject: UploadableFile,
    folderName: FolderName,
    fileName?: string,
): Promise<drive_v3.Schema$File> => {
    const drive = getDrive();
    const folderID = await searchFolder(folderName);
    const bytes = await fileObject.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data } = await drive.files.create({
        requestBody: {
            name: fileName || fileObject.name,
            parents: [folderID],
        },
        media: {
            mimeType: fileObject.mimeType,
            body: Readable.from(buffer),
        },
        fields: "id, name, webViewLink",
    });
    return data;
};

export const createFolder = async (
    folderName: string,
    parentFolderName: FolderName,
): Promise<drive_v3.Schema$File> => {
    if (!["ROOT", "Materials", "Requests"].includes(parentFolderName)) {
        throw { message: "outside allowed directories" };
    }
    const drive = getDrive();
    const parentFolderID = await searchFolder(parentFolderName);
    const { data } = await drive.files.create({
        requestBody: {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentFolderID],
        },
        fields: "id",
    });
    return data;
};

export const listAllFolders = async (
    parentFolderName: FolderName,
): Promise<drive_v3.Schema$File[]> => {
    if (!["ROOT", "Materials", "Requests"].includes(parentFolderName)) {
        throw { message: "outside allowed directories" };
    }
    const parentFolderID = await searchFolder(parentFolderName);
    const drive = getDrive();
    const res = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and trashed=false and '${parentFolderID}' in parents`,
        fields: "files(id, name)",
    });
    if (res.data.files) return res.data.files;
    throw { message: "folder-not-found" };
};

export const downloadFile = async (fileID: string) => {
    const drive = getDrive();
    const res = await drive.files.get(
        { fileId: fileID, alt: "media" },
        { responseType: "stream" },
    );
    return res.data;
};

export const allowAccess = async (email: string) => {
    const drive = getDrive();
    const res = await drive.permissions.create({
        fileId: ROOT_FOLDER_ID as string,
        requestBody: {
            role: "reader",
            type: "user",
            emailAddress: email,
        },
    });
    return res.data;
};

export const denyAccess = async (email: string) => {
    const drive = getDrive();
    const res = await drive.permissions.delete({
        fileId: ROOT_FOLDER_ID as string,
        permissionId: email,
    });
    return res.data;
};

export const moveFile = async (
    fileID: string,
    fromFolderName: FolderName,
    toFolderName: FolderName,
): Promise<drive_v3.Schema$File> => {
    const drive = getDrive();
    const fromFolderID = await searchFolder(fromFolderName);
    const toFolderID = await searchFolder(toFolderName);
    const res = await drive.files.update({
        fileId: fileID,
        addParents: toFolderID,
        removeParents: fromFolderID,
        fields: "id, parents",
    });
    return res.data;
};

export const deleteFile = async (fileID: string): Promise<void> => {
    const drive = getDrive();
    await drive.files.delete({
        fileId: fileID,
    });
};

export const getTotalSizeFromFileIDs = async (fileIDs: string[]): Promise<number> => {
    const drive = getDrive();
    let totalSize = 0;

    for (const fileID of fileIDs) {
        try {
            const response = await drive.files.get({
                fileId: fileID,
                fields: "size",
            });
            totalSize += parseInt(String(response.data.size || 0), 10);
        } catch (error) {
            console.error(
                `Error fetching size for fileID ${fileID}:`,
                error instanceof Error ? error.message : error,
            );
            throw error;
        }
    }

    return totalSize;
};

export const formatSize = (sizeInBytes: number): string => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    let size = sizeInBytes;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
};
