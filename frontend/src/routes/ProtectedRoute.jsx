import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    navigate("/login");
  }

  return children;
};
