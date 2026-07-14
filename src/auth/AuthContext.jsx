/**
 * AuthContext manages the user's authentication state by storing a token,
 * It provides functions for the user to register, log in, and log out,
 * all of which update the token in state.
 */

import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../api/auth.js";

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "fitnessTrackrToken";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const syncUser = async () => {
      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        console.error("Unable to retrieve current user:", error);

        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const register = async (credentials) => {
    const data = await registerUser(credentials);

    const newToken = data.token ?? data.data?.token;

    if (!newToken) {
      throw Error("Registration did not return a token.");
    }

    saveToken(newToken);
    return data;
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    const newToken = data.token ?? data.data?.token;

    if (!newToken) {
      throw Error("Login did not return a token.");
    }

    saveToken(newToken);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used within AuthProvider");
  }

  return context;
}