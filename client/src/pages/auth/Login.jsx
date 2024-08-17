import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputComponent from "../../components/InputComponent";
import { useAuthLoginMutation } from "../../Redux/api/authApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [loginMutation] = useAuthLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await loginMutation({ email, password }).unwrap();
      const decoded = jwtDecode(loginResponse?.data?.accessToken);

      console.log(decoded, "decoded");

      localStorage.setItem("authToken", loginResponse.data.token);
      localStorage.setItem("userType", decoded.userType);

      console.log(loginResponse.data.userId, "loginResponse.data.userId ");

      if (decoded.userType === "admin") {
        navigate("/admin/staff", {
          state: { userId: loginResponse.data.userId },
        });
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.location.reload();
      } else if (decoded.userType === "staff") {
        navigate("/staff/students", {
          state: { userId: loginResponse.data.userId },
        });
        window.location.reload();
      } else if (decoded.userType === "hod") {
        navigate("/hod/staff", {
          state: { userId: loginResponse.data.userId },
        });
        window.location.reload();
      } else {
        console.log("Unknown user type");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you are a student, you can log in now.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <InputComponent
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <InputComponent
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                id="togglePassword"
                className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 mt-4 ${
                  passwordVisible ? "hidden" : "block"
                }`}
                viewBox="0 0 16 16"
                onClick={togglePasswordVisibility}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-eye-slash-fill absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer mt-4 ${
                  passwordVisible ? "block" : "hidden"
                }`}
                id="mama"
                viewBox="0 0 16 16"
                onClick={togglePasswordVisibility}
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
              </svg>
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[900px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
