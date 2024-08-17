import React, { useEffect } from "react";
import { PiStudent, PiWarehouseFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid, LiaLandmarkSolid } from "react-icons/lia";
import { HiOutlineLogout } from "react-icons/hi";
import { GiNewspaper } from "react-icons/gi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const basePath = pathname.split("/").slice(0, 2).join("/");
  console.log(basePath, "basePath");

  const userType = localStorage.getItem("userType");

  const nav =
    (userType === "admin" && [
      {
        id: 1,
        name: "Staff",
        icon: <LiaChalkboardTeacherSolid />,
        url: "/admin/staff",
      },
      { id: 2, name: "Student", icon: <PiStudent />, url: "/admin/student" },
      { id: 3, name: "Degree", icon: <GiNewspaper />, url: "/admin/degree" },
      {
        id: 4,
        name: "Department",
        icon: <PiWarehouseFill />,
        url: "/admin/department",
      },
      {
        id: 5,
        name: "Course",
        icon: <LiaLandmarkSolid />,
        url: "/admin/course",
      },
      {
        id: 6,
        name: "Semester",
        icon: <LiaLandmarkSolid />,
        url: "/admin/semester",
      },
    ]) ||
    (userType === "staff" && [
      { id: 1, name: "Students", url: "/staff/students", icon: <PiStudent /> },
      { id: 2, name: "Course", icon: <LiaChalkboardTeacherSolid /> },
      { id: 3, name: "Mark" },
      { id: 4, name: "Attendance" },
    ]) ||
    (userType === "hod" && [
      { id: 1, name: "Staff", url: "/hod/staff", icon: <PiStudent /> },
      {
        id: 2,
        name: "Students",
        url: "/hod/students",
        icon: <LiaChalkboardTeacherSolid />,
      },
    ]) ||
    [];

  const getInitialSelected = () => {
    const currentPath = location.pathname;
    const currentNavItem = nav.find((item) => currentPath.includes(item.url));

    return currentNavItem ? currentNavItem.id : 0;
  };

  const [selected, setSelected] = React.useState(getInitialSelected);

  useEffect(() => {
    setSelected(getInitialSelected());
  }, [location.pathname, nav]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate(`${basePath}/profile`);
  };

  const bottom = [
    { id: 1, name: "Profile", icon: <IoPersonSharp />, fn: handleProfile },
    { id: 2, name: "Logout", icon: <HiOutlineLogout />, fn: handleLogout },
  ];

  return (
    <nav className="p-6 m-4 flex flex-col justify-between bg-white shadow-lg rounded-xl w-64 h-screen">
      <div>
        {nav.map((val) => (
          <Link
            to={val.url}
            key={val.id}
            className={`flex items-center py-3 px-4 mb-2 rounded-md transition-colors ${
              selected === val.id
                ? "bg-gray-200 text-gray-800"
                : "text-gray-600"
            } hover:bg-gray-100 hover:text-gray-800`}
            onClick={() => setSelected(val.id)}
          >
            <div className="text-2xl">{val.icon}</div>
            <span className="text-lg pl-3">{val.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        {bottom.map((data) => (
          <div
            key={data.id}
            className="flex items-center py-3 px-4 cursor-pointer mb-2 rounded-md transition-colors hover:bg-gray-100 hover:text-gray-800"
            onClick={data.fn}
          >
            <div className="text-2xl"> {data.icon}</div>
            <span className="text-lg pl-3">{data.name}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
