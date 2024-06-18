import React from "react";
import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/auth/adminLogin";

const RouteIndex = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouteIndex;
