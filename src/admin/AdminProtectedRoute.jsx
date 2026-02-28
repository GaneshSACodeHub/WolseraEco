import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // Logged in but not admin
  if (role !== "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  // Authorized
  return children;
}

export default AdminProtectedRoute;