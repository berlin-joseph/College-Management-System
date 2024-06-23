import React from "react";
import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";

const RouteIndex = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouteIndex;
