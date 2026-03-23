import { useState, useCallback } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = useCallback((authResponse) => {
    const userData = {
      id: authResponse.userId,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      roles: authResponse.roles,
    };

    localStorage.setItem("token", authResponse.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(authResponse.token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role) => {
      return user?.roles?.includes(`ROLE_${role}`) ?? false;
    },
    [user],
  );

  return <AuthContext.Provider value={{ user, token, login, logout, hasRole }}>{children}</AuthContext.Provider>;
}
