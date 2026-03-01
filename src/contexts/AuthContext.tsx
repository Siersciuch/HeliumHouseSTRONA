import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  login: string;
  name: string;
  role: "admin" | "crew";
  mustChangePassword: boolean;
}

type StoredUser = User & { password: string };

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

// Pierwsze hasło dla każdego użytkownika (bez polskich znaków, dwie części, wielkie litery)
const DEFAULT_INITIAL_PASSWORD = "Kocham Siersciucha";

const USERS_KEY = "hh_users";

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeName(login: string): string {
  const trimmed = login.trim();
  if (!trimmed) return "Użytkownik";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function newId(): string {
  // Fallback jeśli środowisko nie wspiera crypto.randomUUID
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = crypto as any;
  return typeof c?.randomUUID === "function" ? c.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

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
    const login = username.trim();
    if (!login) return false;

    const users = loadUsers();
    const found = users.find((u) => u.login === login);

    // Jeśli użytkownika nie ma jeszcze w systemie, dopuszczamy bootstrap tylko na hasło startowe.
    if (!found) {
      if (password !== DEFAULT_INITIAL_PASSWORD) return false;

      const isFirstUser = users.length === 0;
      const created: StoredUser = {
        id: newId(),
        login,
        name: normalizeName(login),
        role: isFirstUser ? "admin" : "crew",
        mustChangePassword: true,
        password: DEFAULT_INITIAL_PASSWORD,
      };
      const next = [...users, created];
      saveUsers(next);
      const { password: _pw, ...userData } = created;
      setUser(userData);
      localStorage.setItem("hh_user", JSON.stringify(userData));
      return true;
    }

    // Normalne logowanie
    if (found.password !== password) return false;
    const { password: _pw, ...userData } = found;
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
    const users = loadUsers();
    const idx = users.findIndex((u) => u.login === user.login);
    if (idx === -1) return false;

    const updatedStored: StoredUser = {
      ...users[idx],
      password: newPassword,
      mustChangePassword: false,
    };

    const next = [...users];
    next[idx] = updatedStored;
    saveUsers(next);

    const { password: _pw, ...updated } = updatedStored;
    setUser(updated);
    localStorage.setItem("hh_user", JSON.stringify(updated));
    return true;
  }, [user]);

  const impersonate = useCallback((personId: string) => {
    if (!user || user.role !== "admin") return;
    setRealUser(user);
    localStorage.setItem("hh_real_user", JSON.stringify(user));
    const impersonated: User = {
      id: personId,
      login: personId,
      name: personId,
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
