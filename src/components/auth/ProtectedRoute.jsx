import { Navigate } from "react-router-dom";

// To keep it simple. For prod I'd use Context API or similar
const ProtectedRoute = ({ children }) => {
  // TODO: import from service layer
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
