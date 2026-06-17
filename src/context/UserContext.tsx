"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { UserRole, UserSession, BackendRole } from "@/types";

interface UserContextType {
  user: UserRole;
  session: UserSession | null;
  setSessionData: (payload: { userId: number; username: string; role: string; karmaScore: number } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper to normalize backend strings to frontend roles
const normalizeRole = (backendRole: string | null): UserRole => {
  if (!backendRole) return null;
  switch (backendRole as BackendRole) {
    case "CUSTOMER": return "customer";
    case "KITCHEN_STAFF": return "kitchen_staff";
    case "SYSTEM_ADMIN": return "admin";
    default: return null;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRole>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  const setSessionData = (payload: { userId: number; username: string; role: string; karmaScore: number } | null) => {
    if (!payload) {
      setUser(null);
      setSession(null);
      return;
    }
    const normalizedRole = normalizeRole(payload.role);
    setUser(normalizedRole);
    setSession({
      userId: payload.userId,
      username: payload.username,
      role: normalizedRole,
      karmaScore: payload.karmaScore
    });
  };

  return (
    <UserContext.Provider value={{ user, session, setSessionData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}