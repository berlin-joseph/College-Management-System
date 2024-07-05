import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomDropdown from "./CustomDropdown";
import { useGetUserByIdMutation } from "../Redux/api/authApi";

const Navbar = () => {
  const [profileCard, setProfileCard] = React.useState(false);
  const location = useLocation();

  //
  const userType = localStorage.getItem("userType");

  // state
  const [data, setData] = React.useState(null);

  const userId = location.state?.userId;



  const [getUserById] = useGetUserByIdMutation();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await getUserById({ userId });

        setData(fetchResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getUserById]);



  return (
    <nav>
      <div className=" w-full">
        <section className="flex items-center justify-between p-5 m-5 custom-shadow rounded-2xl">
          <div className="text-2xl">{userType.toLocaleUpperCase()}</div>

          {data?.user_image ? (
            <img src={data?.user_image} height={70} width={70} />
          ) : (
            <div
              className="hover:cursor-pointer"
              onClick={() => setProfileCard(!profileCard)}
            >
              <IoPersonCircleOutline className="text-6xl" />
            </div>
          )}
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
