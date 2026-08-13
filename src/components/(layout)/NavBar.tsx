"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import type { Session } from "next-auth";

interface NavBarProps {
    isResourceManager: boolean;
    session: Session | null;
}

const NavBar = ({ isResourceManager, session }: NavBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const activeColor = "#e0e0e0";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="border-b border-gray-300">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 transition-all duration-300">
                <a href="/" className="flex gap-2 items-center rtl:space-x-reverse">
                    <span className={`self-center text-2xl font-semibold whitespace-nowrap`}>AcadVault2.0</span>
                </a>
                <div className={"flex flex-col rtl:space-x-reverse"}>
                    <button className="focus:outline-none lg:hidden" onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? "flex absolute right-5 top-16 py-3 z-50 bg-neutral-950 border border-gray-300 rounded-md min-w-[200px] items-center" : "hidden"} flex-col lg:flex lg:flex-row lg:items-center lg:w-auto lg:space-x-6 rtl:space-x-reverse`}>
                        {session ? (
                            <>
                                <a href="/browse" style={{ color: pathname.includes("/browse") ? `${activeColor}` : "", fontWeight: pathname.includes("/browse") ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">Browse</a>
                                <a href="/new-material" style={{ color: pathname === "/new-material" ? `${activeColor}` : "", fontWeight: pathname === "/new-material" ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">Upload</a>
                                {isResourceManager && (<a href="/requests" style={{ color: pathname === "/requests" ? `${activeColor}` : "", fontWeight: pathname === "/requests" ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">Requests</a>)}
                                <a href="/about" style={{ color: pathname === "/about" ? `${activeColor}` : "", fontWeight: pathname === "/about" ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">About</a>
                                <a href="/me" style={{ color: pathname === "/me" ? `${activeColor}` : "", fontWeight: pathname === "/me" ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">{isMenuOpen ? ("Profile") : (<User className="inline-block w-5 h-5 me-1" />)}</a>
                            </>
                        ) : (
                            <>
                                <a href="/about" style={{ color: pathname === "/about" ? `${activeColor}` : "", fontWeight: pathname === "/about" ? "bold" : "normal", }} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium w-full h-full text-gray-100 hover:text-white transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">About</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
