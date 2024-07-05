import React, { useEffect } from "react";
import { PiStudent, PiWarehouseFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid, LiaLandmarkSolid } from "react-icons/lia";
import { HiOutlineLogout } from "react-icons/hi";
import { GiNewspaper } from "react-icons/gi";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //
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
    ]) ||
    (userType === "staff" && [
      { id: 1, name: "Students", url: "/staff/students", icon: <PiStudent /> },
      { id: 2, name: "Course", icon: <LiaChalkboardTeacherSolid /> },
      { id: 3, name: "Mark" },
      { id: 4, name: "Attendance" },
    ]) ||
    [];

  const getInitialSelected = () => {
    const currentPath = location.pathname;
    const currentNavItem = nav.find((item) => currentPath.includes(item.url));
    return currentNavItem ? currentNavItem.id : 1;
  };

  const [selected, setSelected] = React.useState(getInitialSelected);

  useEffect(() => {
    setSelected(getInitialSelected());
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <nav className="p-5 m-5 flex flex-col justify-between custom-shadow rounded-2xl w-72 h-screen">
      <div>
        {nav.map((val) => (
          <Link
            to={val.url}
            key={val.id}
            className={`flex items-center py-5 cursor-pointer ${
              selected === val.id ? "bg-gray-200 rounded-xl pl-5" : ""
            }`}
            onClick={() => setSelected(val.id)}
          >
            <div className="text-2xl">{val.icon}</div>
            <h1 className="text-xl pl-3">{val.name}</h1>
          </Link>
        ))}
      </div>
      <div className="flex items-center cursor-pointer" onClick={handleLogout}>
        <HiOutlineLogout className="text-2xl" />
        <h1 className="text-xl pl-3">Logout</h1>
      </div>
    </nav>
  );
};

export default Sidebar;
