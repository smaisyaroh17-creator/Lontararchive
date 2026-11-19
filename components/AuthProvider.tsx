"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  isLoggedIn as checkLogin,
  getLoggedInEmail,
  logoutDummy,
} from "@/lib/auth";

type AuthContextType = {
  isLoggedIn: boolean;
  email: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loginStatus = checkLogin();

    setIsLoggedIn(loginStatus);
    setEmail(loginStatus ? getLoggedInEmail() : null);
    setIsReady(true);
  }, []);

  function logout() {
    logoutDummy();
    setIsLoggedIn(false);
    setEmail(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        logout,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}