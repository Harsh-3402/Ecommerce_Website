import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { registerUser } from "../services/authService";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errData, setErrData] = useState({
    nerr: "",
    emerr: "",
    perr: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorKey =
      name === "name" ? "nerr" : name === "email" ? "emerr" : "perr";

    setErrData((prev) => ({
      ...prev,
      [errorKey]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setServerError("");
    setSuccessMessage("");

    const nameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const errors = {
      nerr: "",
      emerr: "",
      perr: "",
    };

    if (!nameRegex.test(formData.name.trim())) {
      errors.nerr = "Please enter a valid name.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      errors.emerr = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      errors.perr =
        "Use 8+ characters with uppercase, lowercase, a number and a special character.";
    }

    if (errors.nerr || errors.emerr || errors.perr) {
      setErrData(errors);
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      console.log(response.data);

      setSuccessMessage("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setErrData({
        nerr: "",
        emerr: "",
        perr: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      console.error("Registration failed:", error.response?.data);

      setServerError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#e5e3da] bg-[#fdfcf9] py-3.5 pl-11 pr-4 text-sm text-[#243d33] outline-none transition-all placeholder:text-[#9a9d96] focus:border-[#174638] focus:bg-white focus:ring-4 focus:ring-[#174638]/10";

  const labelClass = "mb-2 block text-sm font-medium text-[#344c40]";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fcfaf6] px-4 py-10 sm:px-6 lg:py-14">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#dce9d8]/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#eee7d9]/70 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#e8e4dc] bg-white shadow-[0_25px_80px_rgba(31,56,43,0.09)] lg:min-h-[690px] lg:grid-cols-2">
        {/* Left Branding Panel */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden flex-col justify-between overflow-hidden bg-[#103c30] p-10 text-white lg:flex xl:p-14"
        >
          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 top-36 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/[0.04]" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Leaf size={27} className="fill-white" />
            </div>

            <span className="text-xl font-bold tracking-[0.15em]">
              SHOPNEST
            </span>
          </Link>

          <div className="relative z-10 max-w-md py-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-medium text-white/85">
              <ShoppingBag size={15} />
              A better way to shop
            </span>

            <h1 className="text-4xl font-semibold leading-[1.2] tracking-tight xl:text-5xl">
              Find your
              <br />
              next favorite
              <br />
              <span className="text-[#c7d9b9]">thing.</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              Create your ShopNest account and discover products picked to
              make everyday shopping feel special.
            </p>

            <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#103c30] bg-[#e3cdb6] text-xs font-semibold text-[#34483c]">
                  S
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#103c30] bg-[#c6d7bd] text-xs font-semibold text-[#34483c]">
                  N
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#103c30] bg-[#eee3d1] text-xs font-semibold text-[#34483c]">
                  +
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Your shopping journey</p>
                <p className="mt-1 text-xs text-white/60">
                  Starts with one simple account.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-white/60">
            <ShieldCheck size={16} />
            Your account details are handled securely.
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-10 xl:px-14"
        >
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-9 flex items-center justify-center gap-2 text-[#153a30] lg:hidden"
            >
              <Leaf size={27} className="fill-[#153a30]" />

              <span className="text-lg font-bold tracking-[0.13em]">
                SHOPNEST
              </span>
            </Link>

            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#648b69]">
                Get started today
              </span>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#173d30] sm:text-4xl">
                Create account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#737b73]">
                Join ShopNest and make your shopping experience personal.
              </p>
            </div>

            {/* Server Messages */}
            <AnimatePresence mode="wait">
              {serverError && (
                <motion.div
                  key="server-error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="alert"
                  className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="status"
                  className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
                >
                  <CheckCircle2 size={18} />
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-5"
              >
                <label htmlFor="signup-name" className={labelClass}>
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a958b]"
                  />

                  <input
                    id="signup-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(errData.nerr)}
                    aria-describedby={
                      errData.nerr ? "signup-name-error" : undefined
                    }
                    className={`${inputClass} ${
                      errData.nerr ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {errData.nerr && (
                    <motion.p
                      id="signup-name-error"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden text-xs text-red-600"
                    >
                      {errData.nerr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mb-5"
              >
                <label htmlFor="signup-email" className={labelClass}>
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a958b]"
                  />

                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errData.emerr)}
                    aria-describedby={
                      errData.emerr ? "signup-email-error" : undefined
                    }
                    className={`${inputClass} ${
                      errData.emerr ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {errData.emerr && (
                    <motion.p
                      id="signup-email-error"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden text-xs text-red-600"
                    >
                      {errData.emerr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.29 }}
                className="mb-6"
              >
                <label htmlFor="signup-password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a958b]"
                  />

                  <input
                    id="signup-password"
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    aria-invalid={Boolean(errData.perr)}
                    aria-describedby={
                      errData.perr ? "signup-password-error" : undefined
                    }
                    className={`${inputClass} pr-12 ${
                      errData.perr ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#68776c] transition hover:bg-[#edf1e9] hover:text-[#174638]"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#858b83]">
                  At least 8 characters, including uppercase, lowercase, a
                  number and a special character.
                </p>

                <AnimatePresence>
                  {errData.perr && (
                    <motion.p
                      id="signup-password-error"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden text-xs leading-5 text-red-600"
                    >
                      {errData.perr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,70,56,0.16)] transition hover:bg-[#205b49] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-7 text-center text-sm text-[#737b73]"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#174638] underline-offset-4 transition hover:text-[#648b69] hover:underline"
              >
                Sign in
              </Link>
            </motion.p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8a9189]">
              <ShieldCheck size={15} />
              Secure account creation with ShopNest
            </div>

            <p className="mt-5 text-center text-xs text-[#a0a49d]">
              By creating an account, you agree to our applicable terms and
              privacy policy.
            </p>
          </div>
        </motion.div>
      </div>

      <p className="relative mt-6 text-center text-xs text-[#969b93]">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </p>
    </div>
  );
}

export default SignUp;