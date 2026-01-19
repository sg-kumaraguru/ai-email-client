import { createContext, useContext, useEffect, useState } from "react";
import { getMe, updateUser as apiUpdateUser } from "../api";

// ---------- Auth Context ----------
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // Fetch current user
  const checkAuth = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  // Update user info and refresh context
  const updateUser = async (payload) => {
    try {
      const res = await apiUpdateUser(payload);
      setUser(res.user); // update local context with new user data
      return res;
    } catch (err) {
      console.error("Failed to update user", err);
      throw err;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: !!user,
        checking,
        refreshAuth: checkAuth,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------- Hook ----------
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

