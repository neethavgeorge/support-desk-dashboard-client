import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("sdd_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Persist user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("sdd_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sdd_user");
    }
  }, [user]);

  // Persist token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Login → set both user + token
  const login = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem("sdd_user", JSON.stringify(payload.user));
    localStorage.setItem("token", payload.token);
  };

  // Logout → clear both, navigation handled in component
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sdd_user");
    localStorage.removeItem("token");
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
