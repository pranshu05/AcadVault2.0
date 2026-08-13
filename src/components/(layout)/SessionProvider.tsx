"use client";

import { createContext, type ReactNode } from "react";
import type { Session } from "next-auth";

interface SessionContextValue {
    session: Session | null;
}

export const SessionContext = createContext<SessionContextValue>({ session: null });

interface SessionProviderProps {
    children: ReactNode;
    session: Session | null;
}

const SessionProvider = ({ children, session }: SessionProviderProps) => (
    <SessionContext.Provider value={{ session }}>
        {children}
    </SessionContext.Provider>
);

export default SessionProvider;
