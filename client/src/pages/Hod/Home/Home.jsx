import React from "react";
import Navbar from "../../../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
