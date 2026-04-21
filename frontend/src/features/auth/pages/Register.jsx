import React, { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setShowError("");
  };

  const handleRegistration = async () => {
    const { userName, email, password } = userData;

    if (!userName || !email || !password) {
      setShowError("Please fill all the details.");
      return;
    }

    setLoading(false);
    try {
      const response = await registerApi(userData);
      setUserData({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      setShowError(
        err.response?.data?.return_message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        className="bg-white p-9 rounded-xl shadow-md w-97"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 1.8 }}
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-1">
            Create <span className="text-[#7a7b82]">Campaign Pulse</span>{" "}
            Account
          </h2>
          <p className="text-sm my-2 text-[#aaaeb1]">
            Drive growth with intelligent automation and effortless teamwork
          </p>
        </div>

        <div className="my-8">
          {showError && (
            <p className="my-2 text-[#ff0000] text-sm">{showError}</p>
          )}

          <div>
            <input
              name="userName"
              placeholder="Enter your Username"
              className={`w-full border p-2 mb-4 rounded focus:outline-none focus:border-[#cccbcb] ${showError && "border-[#f00]"}`}
              value={userData.userName}
              onChange={handleChange}
            />
          </div>
          <input
            name="email"
            placeholder="Enter your Email"
            className={`w-full border p-2 mb-4 rounded focus:outline-none focus:border-[#cccbcb] ${showError && "border-[#f00]"}`}
            value={userData.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className={`w-full border p-2 mb-6 rounded focus:outline-none focus:border-[#cccbcb] ${showError && "border-[#f00]"}`}
            value={userData.password}
            onChange={handleChange}
          />

          <button
            className="w-full border-2 bg-black text-white py-2.5 rounded-full border-black hover:bg-white hover:text-black hover:border-black hover:font-semibold transition-all duration-300"
            onClick={() => handleRegistration()}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <div>
          <div className="border mb-3"></div>
          <p className="text-center text-[#aaaeb1]">
            Already have an account?&nbsp;
            <span className="text-black font-semibold">
              <Link to="/login" className="hover:underline">
                Sign In
              </Link>
            </span>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default Register;
