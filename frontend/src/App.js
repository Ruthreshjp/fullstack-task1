import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
    }

    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <Header
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={
            isLoggedIn && userRole === "admin" ? <Navigate to="/dashboard" /> : <Home />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
