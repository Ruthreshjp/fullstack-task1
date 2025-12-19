import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, requiredRole, children }) {
  const tokenFromStorage = localStorage.getItem("token");
  const roleFromStorage = localStorage.getItem("role");

  if (!tokenFromStorage && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && roleFromStorage !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;