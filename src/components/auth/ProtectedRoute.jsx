import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  if (isAuthenticated === null) {
    // TODO: loading spinner
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
