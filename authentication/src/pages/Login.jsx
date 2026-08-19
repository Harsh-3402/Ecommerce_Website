import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { loginUser } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errData, setErrData] = useState({
    emerr: "",
    perr: "",
  });

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrData({
      ...errData,
      [e.target.name === "email" ? "emerr" : "perr"]: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const errors = {
      emerr: "",
      perr: "",
    };

    if (!emailRegex.test(formData.email)) {
      errors.emerr = "Email is not valid";
    }

    if (!passwordRegex.test(formData.password)) {
      errors.perr = "Password is not valid";
    }

    if (errors.emerr || errors.perr) {
      setErrData(errors);
      return;
    }

    try {
      const response = await loginUser(formData);

      console.log(response.data);

      alert("Success");

      setFormData({
        email: "",
        password: "",
      });

      setErrData({
        emerr: "",
        perr: "",
      });

      navigate("/products");

    } catch (error) {
      console.log(error.response?.data);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 overflow-hidden">

      {/* Background glow */}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl"
      />

      {/* Login Card */}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        whileHover={{
          boxShadow: "0px 20px 60px rgba(0,0,0,0.45)",
        }}
        className="relative w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800"
      >

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-white mb-8"
        >
          Login
        </motion.h1>

        {/* Email */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <label className="text-gray-300 block mb-2">
            Email
          </label>

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <AnimatePresence>
            {errData.emerr && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errData.emerr}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Password */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <label className="text-gray-300 block mb-2">
            Password
          </label>

          <div className="flex">

            <motion.input
              whileFocus={{
                scale: 1.02,
              }}
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <motion.button
              type="button"
              onClick={() => setShowPass(!showPass)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="bg-blue-600 hover:bg-blue-700 px-5 rounded-r-lg text-white"
            >
              {showPass ? "🙈" : "👁️"}
            </motion.button>

          </div>

          <AnimatePresence>
            {errData.perr && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errData.perr}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Login Button */}

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </motion.button>

        {/* Signup */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 mt-6"
        >
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 ml-2"
          >
            Sign Up
          </Link>
        </motion.p>

      </motion.form>
    </div>
  );
}

export default Login;