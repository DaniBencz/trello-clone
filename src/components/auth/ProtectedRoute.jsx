import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
