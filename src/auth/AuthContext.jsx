/**
 * AuthContext manages the user's authentication state by storing a token,
 * It provides functions for the user to register, log in, and log out,
 * all of which update the token in state.
 */

import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/auth.js";

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "fitnessTrackrToken";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const getCurrentUser = async () => {
      try {
        const { data } = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (error) {
        console.error("Unable to retrieve current user:", error);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const register = async ({ username, password }) => {
    const { data } = await api.post("/users/register", {
      username,
      password,
    });

    const newToken = data.token;

    if (!newToken) {
      throw new Error("The registration response did not include a token.");
    }

    saveToken(newToken);
    return data;
  };

  const login = async ({ username, password }) => {
    const { data } = await api.post("/users/login", {
      username,
      password,
    });

    const newToken = data.token;

    if (!newToken) {
      throw new Error("The login response did not include a token.");
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
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}