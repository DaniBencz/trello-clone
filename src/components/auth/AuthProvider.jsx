import { useState, useEffect, useCallback } from "react";
import { login, logout, checkAuth } from "../../services/authService";
import { AuthContext } from "../../context/authContext";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth()
      .then((auth) => setIsAuthenticated(auth))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await logout();
    setIsAuthenticated(false);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
