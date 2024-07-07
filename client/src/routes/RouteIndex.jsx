import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminIndex from "../pages/admin/Home/Home";
import StaffIndex from "../pages/Staff/Home/Home";
import AdminStudent from "../pages/admin/Student";
import Staff from "../pages/admin/Staff";
import Degree from "../pages/admin/Degree";
import Department from "../pages/admin/Department";
import Students from "../pages/Staff/Students/Students";
import Course from "../pages/admin/Course";
import Semester from "../pages/admin/Semester";
import HodStaff from "../pages/Hod/HodStaff";
import HodStudents from "../pages/Hod/HodStudents";

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldn't find the page you're looking for
          </p>
          <a
            href="/"
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
          >
            Back to homepage
          </a>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

const RouteIndex = () => {
  const userType = localStorage.getItem("userType");

  return (
    <Routes>
      <Route
        path="/"
        element={
          userType === "admin" ? (
            <Navigate to="/admin" />
          ) : userType === "staff" ? (
            <Navigate to="/staff" />
          ) : userType === "hod" ? (
            <Navigate to="/hod" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      {userType === "admin" ? (
        <Route path="/admin" element={<AdminIndex />}>
          <Route path="student" element={<AdminStudent />} />
          <Route path="staff" element={<Staff />} />
          <Route path="degree" element={<Degree />} />
          <Route path="department" element={<Department />} />
          <Route path="course" element={<Course />} />
          <Route path="semester" element={<Semester />} />
        </Route>
      ) : (
        <Route path="/admin/*" element={<Navigate to="/login" />} />
      )}
      {userType === "staff" ? (
        <Route path="/staff" element={<StaffIndex />}>
          <Route path="students" element={<Students />} />
        </Route>
      ) : (
        <Route path="/staff/*" element={<Navigate to="/login" />} />
      )}
      {userType === "hod" ? (
        <Route path="/hod" element={<StaffIndex />}>
          <Route path="staff" element={<HodStaff />} />
          <Route path="students" element={<HodStudents />} />
        </Route>
      ) : (
        <Route path="/hod/*" element={<Navigate to="/login" />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteIndex;



