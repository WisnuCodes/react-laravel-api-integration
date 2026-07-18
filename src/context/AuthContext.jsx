import { createContext, useContext, useState } from "react";
import { apiRequest } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        console.error("Gagal parsing user dari localStorage");
      }
    }
    return null;
  });
  const [loading] = useState(false);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } catch (err) {
      void err;
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return context;
}
