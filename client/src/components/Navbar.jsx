import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useGetUserByIdMutation } from "../Redux/api/authApi";

const Navbar = () => {
  const [profileCard, setProfileCard] = React.useState(false);
  const location = useLocation();

  const userType = localStorage.getItem("userType");

  const [data, setData] = React.useState(null);

  const userId = location.state?.userId;

  const [getUserById] = useGetUserByIdMutation();

  React.useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const fetchResponse = await getUserById({ userId }).unwrap();
          setData(fetchResponse?.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [getUserById, userId, userType, location]);

  const pathname = location.pathname;

  const basePath = pathname.split("/").slice(0, 2).join("/");

  console.log(basePath, "basePath");

  const handleProfile = () => {
    navigate(`${basePath}/profile`);
  };

  return (
    <nav>
      <div className="w-full">
        <section className="flex items-center justify-between p-5 m-5 custom-shadow rounded-2xl">
          <div className="text-2xl">{userType.toLocaleUpperCase()}</div>

          {data?.user_image ? (
            <div onClick={handleProfile}>
              <img src={data.user_image} height={70} width={70} alt="User" />
            </div>
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
