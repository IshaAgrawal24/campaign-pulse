import { motion } from "framer-motion";
import AuthLayout from "../../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    identifier: "",
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

  const handleLogin = async () => {
    const { identifier, password } = userData;
    if (!identifier || !password) {
      setShowError("Please fill all the details.");
      return;
    }

    setLoading(true);
    try {
      const data = loginApi(userData);
      localStorage.setItem("token", data.token);
      // navigate("/");
    } catch (error) {
      setShowError(err.response?.data?.return_message || "Something went wrong");
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
        {/* Head  */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-1">
            Login to <span className="text-[#7a7b82]">Campaign Pulse</span>
          </h2>
          <p className="text-sm my-2 text-[#aaaeb1]">
            Drive growth with intelligent automation and effortless teamwork
          </p>
        </div>

        {/* Form  */}
        <div className="my-8">
          {showError && (
            <p className="my-2 text-[#ff0000] text-sm">{showError}</p>
          )}
          <input
            name="identifier"
            placeholder="Enter your Email or Username"
            className={`w-full border p-2 mb-4 rounded focus:outline-none focus:border-[#cccbcb] ${showError && "border-[#f00]"}`}
            value={userData.identifier}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className={`w-full border p-2 mb-8 rounded focus:outline-none focus:border-[#cccbcb] ${showError && "border-[#f00]"}`}
            value={userData.password}
            onChange={handleChange}
          />

          <button
            className="w-full border-2 bg-black text-white py-2.5 rounded-full border-black hover:bg-white hover:text-black hover:border-black hover:font-semibold transition-all duration-300"
            onClick={() => handleLogin()}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div>
          <div className="border mb-3"></div>
          <p className="text-center text-[#aaaeb1]">
            Don't have an account?&nbsp;{" "}
            <span className="text-black font-semibold">
              <Link to="/register" className="hover:underline">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

export default Login;
