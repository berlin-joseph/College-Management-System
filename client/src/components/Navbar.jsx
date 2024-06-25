import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomDropdown from "./CustomDropdown";

const Navbar = () => {
  const [profileCard, setProfileCard] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  return (
    <nav>
      <div className=" w-full">
        <section className="flex items-center justify-between p-5 m-5 custom-shadow rounded-2xl">
          <div className="text-2xl">Admin</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => setProfileCard(!profileCard)}
          >
            <IoPersonCircleOutline className="text-6xl" />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
