import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, requiredRole, children }) {
  const tokenls = localStorage.getItem("token");
  const rolels = localStorage.getItem("role");

  if (!tokenls && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && rolels !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;