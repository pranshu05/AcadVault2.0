import type { ReactNode } from "react";

interface BrowseCardProps {
    children: ReactNode;
    href: string;
    isSquare?: boolean;
}

const BrowseCard = ({ children, href, isSquare = true }: BrowseCardProps) => (
    <a href={href}>
        <div className={isSquare ? "aspect-square h-full" : "h-full"}>
            <div className="bg-neutral-950 rounded-lg border border-gray-300 p-3 flex flex-col items-center justify-center w-full h-full text-center overflow-hidden max-w-[100%] hover:scale-105 transition ease-linear cursor-pointer">
                {children}
            </div>
        </div>
    </a>
);

export default BrowseCard;
