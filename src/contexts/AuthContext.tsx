import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mockPeople } from "@/data/mock-data";

export interface User {
  id: string;
  login: string;
  name: string;
  role: "admin" | "crew";
  mustChangePassword: boolean;
}

interface AuthContextType {
  user: User | null;
  realUser: User | null;
  isAuthenticated: boolean;
  isImpersonating: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<boolean>;
  impersonate: (personId: string) => void;
  stopImpersonating: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users
const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", login: "admin", password: "admin123", name: "Jan Kowalski", role: "admin", mustChangePassword: false },
  { id: "2", login: "crew1", password: "crew123", name: "Anna Nowak", role: "crew", mustChangePassword: true },
  { id: "3", login: "crew2", password: "crew123", name: "Piotr Wiśniewski", role: "crew", mustChangePassword: false },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("hh_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [realUser, setRealUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("hh_real_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const found = MOCK_USERS.find((u) => u.login === username && u.password === password);
    if (!found) return false;
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem("hh_user", JSON.stringify(userData));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRealUser(null);
    localStorage.removeItem("hh_user");
    localStorage.removeItem("hh_real_user");
  }, []);

  const changePassword = useCallback(async (newPassword: string): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, mustChangePassword: false };
    setUser(updated);
    localStorage.setItem("hh_user", JSON.stringify(updated));
    return true;
  }, [user]);

  const impersonate = useCallback((personId: string) => {
    if (!user || user.role !== "admin") return;
    setRealUser(user);
    localStorage.setItem("hh_real_user", JSON.stringify(user));
    const person = mockPeople.find((p) => p.id === personId);
    const impersonated: User = {
      id: personId,
      login: personId,
      name: person?.name || personId,
      role: "crew",
      mustChangePassword: false,
    };
    setUser(impersonated);
    localStorage.setItem("hh_user", JSON.stringify(impersonated));
  }, [user]);

  const stopImpersonating = useCallback(() => {
    if (!realUser) return;
    setUser(realUser);
    localStorage.setItem("hh_user", JSON.stringify(realUser));
    setRealUser(null);
    localStorage.removeItem("hh_real_user");
  }, [realUser]);

  const isImpersonating = !!realUser;

  return (
    <AuthContext.Provider value={{ user, realUser, isAuthenticated: !!user, isImpersonating, login, logout, changePassword, impersonate, stopImpersonating }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
