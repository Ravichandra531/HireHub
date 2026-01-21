import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const getStorage = (key) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`Error accessing localStorage key "${key}":`, e);
  }
  return null;
};

const setStorage = (key, value) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn(`Error setting localStorage key "${key}":`, e);
  }
};

const removeStorage = (key) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (e) {
    console.warn(`Error removing localStorage key "${key}":`, e);
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStorage("token"));
  const [user, setUser] = useState(() => {
    const savedUser = getStorage("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (tok, userData) => {
    setStorage("token", tok);
    setStorage("user", JSON.stringify(userData));
    setStorage("role", userData.role);
    setToken(tok);
    setUser(userData);
  };

  const logout = () => {
    removeStorage("token");
    removeStorage("user");
    removeStorage("role");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
