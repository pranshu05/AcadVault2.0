"use client";

export const formatDate = (date: string | number | Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const day = new Date(date).getDate();
    return formattedDate.replace(`${day}`, `${day}`);
};

export const openFile = (fileID: string): void => {
    const webviewLink = `https://drive.google.com/file/d/${fileID}/view`;
    window.open(webviewLink, "_blank");
};

export const deldupe = <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
};
