import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./MainLayout";
import Profile from "./pages/Profile";
function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />
<Route
  path="/profile"
  element={
    token ? <Profile /> : <Navigate to="/login" replace />
  }
/>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          token ? <MainLayout /> : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;