import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes  */}
        <Route path="/" element={<ProtectedRoute>Home</ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};
